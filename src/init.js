import * as yup from 'yup';
import i18n from 'i18next';
import _ from 'lodash';
import resources from './locales/index.js';
import getWatchedState from './view.js';
import getRequest from './getRequest.js';
import parser from './parser.js';

const startTimeout = (state, watchedState, i18nInstance) => {
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
    startTimeout(state, watchedState, i18nInstance);
  }, 5000);
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
      modalState: 'closed',
      modalPostId: null,
    },
    feeds: [],
    posts: {
      postsList: [],
      postsReadList: new Set(),
    },
    error: null,
    rssForm: {
      valid: null,
      processState: 'filling',
      fields: {
        url: '',
      },
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
      const watchedState = getWatchedState(state, elements, i18nInstance);

      yup.setLocale({
        string: {
          url: i18nInstance.t('validation.errors.incorrectUrl'),
        },
      });

      const schema = yup.object().shape({
        url: yup.string().url(),
      });

      elements.rssForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const currentUrl = formData.get('url').trim();
        watchedState.rssForm.fields.url = currentUrl;
        watchedState.rssForm.processState = 'loading';
        schema
          .validate(state.rssForm.fields)
          .then(() => {
            const isDublicateFeed = state.feeds.find(({ url }) => url === currentUrl);
            if (isDublicateFeed) {
              watchedState.rssForm.valid = false;
              watchedState.error = i18nInstance.t('validation.errors.dublicateUrl');
              watchedState.rssForm.processState = 'error';
            } else {
              watchedState.rssForm.valid = true;
              watchedState.error = null;

              getRequest(currentUrl)
                .then((data) => {
                  const { feed, posts } = parser(currentUrl, data, i18nInstance);
                  const feedId = _.uniqueId();
                  const newFeeds = _.differenceBy([feed], state.feeds, 'url');
                  const newPosts = _.differenceBy(posts, state.posts.postsList, 'link');

                  const newFeedsWithId = newFeeds.map((newFeed) => ({
                    ...newFeed,
                    id: feedId,
                  }));
                  const newPostsWithId = newPosts.map((newPost) => ({
                    ...newPost,
                    id: _.uniqueId(),
                    feedId,
                  }));

                  watchedState.feeds.push(...newFeedsWithId);
                  watchedState.posts.postsList.push(...newPostsWithId);
                  watchedState.rssForm.processState = 'completed';
                })
                .catch((error) => {
                  if (error.isParsingError) {
                    watchedState.error = i18nInstance.t('network.errors.invalidRss');
                  } else {
                    watchedState.error = i18nInstance.t('network.errors.connectionError');
                  }
                  watchedState.rssForm.processState = 'error';
                });
            }
          })
          .catch((error) => {
            watchedState.error = error.errors;
            watchedState.rssForm.valid = false;
            watchedState.rssForm.processState = 'error';
          });
        startTimeout(state, watchedState, i18nInstance); // вызов функции
        // watchedState.rssForm.processState = 'filling';
      });

      elements.postsContainer.addEventListener('click', (e) => {
        const { target } = e;
        const btnId = target.dataset.id;
        if (btnId) {
          watchedState.modal.modalPostId = btnId;
          watchedState.modal.modalState = 'opened';
          watchedState.posts.postsReadList.add(btnId);
        }
      });

      elements.modalContainer.addEventListener('click', (e) => {
        const { target } = e;
        const btnClosed = target.dataset.bsDismiss;
        if (btnClosed && btnClosed === 'modal') {
          e.preventDefault();
          watchedState.modal.modalPostId = null;
          watchedState.modal.modalState = 'closed';
        }
      });

      document.body.addEventListener('click', (e) => {
        const { target } = e;
        const modal = target.getAttribute('aria-modal');
        if (modal) {
          watchedState.modal.modalPostId = null;
          watchedState.modal.modalState = 'closed';
        }
      });
    });
};
