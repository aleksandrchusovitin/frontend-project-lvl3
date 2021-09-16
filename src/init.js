import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import getWatchedState from './view.js';
import parser from './parser.js';

export default () => {
  const elements = {
    rssForm: document.querySelector('.rss-form'),
    urlInput: document.querySelector('input[aria-label="url"]'),
    rssBtn: document.querySelector('button[aria-label="add"]'),
    feedbackEl: document.querySelector('p.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
  };

  const state = {
    feeds: [],
    posts: [],
    errors: {},
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
        const currentUrl = formData.get('url');
        watchedState.rssForm.fields.url = currentUrl;
        watchedState.rssForm.processState = 'send';
        schema
          .validate(state.rssForm.fields)
          .then(() => {
            const isDublicateFeed = state.feeds.find(({ url }) => url === currentUrl);
            if (isDublicateFeed) {
              watchedState.rssForm.valid = false;
              watchedState.errors.ValidationError = [i18nInstance.t('validation.errors.dublicateUrl')];
            } else {
              watchedState.rssForm.valid = true;
              watchedState.errors.ValidationError = [];

              parser(currentUrl, watchedState);
            }
          })
          .catch((error) => {
            watchedState.errors[error.name] = [...error.errors];
            watchedState.rssForm.valid = false;
          });
        watchedState.rssForm.processState = 'filling';
      });
    });
};
