import * as yup from 'yup';
import i18n from 'i18next';
import _ from 'lodash';
import resources from './locales/index.js';
import getWatchedState from './view.js';
import getRequest from './getRequest.js';
import parser from './parser.js';
import loadFeed from './loadFeed.js';

const updatePosts = (state, watchedState, i18nInstance) => {
  setTimeout(() => {
    const requests = state.feeds.map((feed) => getRequest(feed.url));
    Promise.all(requests)
      .then((data) => {
        data.forEach((feed) => {
          const { posts } = parser(feed.url, feed, i18nInstance);
          const newPosts = _.differenceBy(posts, state.posts.postsList, 'link');

          const newPostsWithId = newPosts.map((newPost) => ({
            ...newPost,
            id: _.uniqueId(),
            feedId: feed.id,
          }));
          watchedState.posts.postsList.push(...newPostsWithId);
        });
      });
    updatePosts(state, watchedState, i18nInstance);
  }, 5000);
};

const validate = (url, links) => {
  const shema = yup.string().url().required().notOneOf(links);
  shema.validateSync(url);
};

export default () => {
  const elements = {
    rssForm: document.querySelector('.rss-form'),
    urlInput: document.querySelector('input[aria-label="url"]'),
    rssBtn: document.querySelector('button[aria-label="add"]'),
    feedbackEl: document.querySelector('p.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
    modalContainer: document.querySelector('.modal'),
  };

  const state = {
    modal: {
      modalPostId: null,
    },
    feeds: [],
    posts: {
      postsList: [],
      postsReadList: new Set(),
    },
    rssForm: {
      error: null,
      state: 'filling',
      url: '',
    },
  };

  const defaultLanguage = 'ru';
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  })
    .then(() => {
      yup.setLocale({
        string: {
          url: i18nInstance.t('validation.errors.incorrectUrl'),
        },
        mixed: {
          notOneOf: i18nInstance.t('validation.errors.dublicateUrl'),
        },
      });

      const watchedState = getWatchedState(state, elements, i18nInstance);

      elements.rssForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const currentUrl = formData.get('url').trim();

        try {
          validate(currentUrl, state.feeds.map((item) => item.url));
          watchedState.rssForm.url = currentUrl;
          watchedState.rssForm.state = 'loading';
          watchedState.rssForm.error = null;

          loadFeed(currentUrl)
            .then(({ feed, posts }) => {
              const feedId = _.uniqueId();

              const newFeedWithId = {
                ...feed,
                id: feedId,
              };

              const newPostsWithId = posts.map((post) => ({
                ...post,
                id: _.uniqueId(),
                feedId,
              }));

              watchedState.feeds.push(newFeedWithId);
              watchedState.posts.postsList.push(...newPostsWithId);
              watchedState.rssForm.state = 'completed';
            })
            .catch((error) => {
              if (error.isParsingError) {
                watchedState.rssForm.error = i18nInstance.t('network.errors.invalidRss');
              } else {
                watchedState.rssForm.error = i18nInstance.t('network.errors.connectionError');
              }
              watchedState.rssForm.state = 'error';
            });
        } catch (error) {
          watchedState.rssForm.error = error.message;
          watchedState.rssForm.state = 'error';
        }
        updatePosts(state, watchedState, i18nInstance);
      });

      elements.postsContainer.addEventListener('click', (e) => {
        const { target } = e;
        const btnId = target.dataset.id;
        if (btnId) {
          watchedState.modal.modalPostId = btnId;
          watchedState.posts.postsReadList.add(btnId);
        }
      });
    });
};
