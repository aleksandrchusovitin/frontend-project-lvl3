import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import getWatchedState from './view.js';

export default () => {
  const elements = {
    rssForm: document.querySelector('.rss-form'),
    urlInput: document.querySelector('input[aria-label="url"]'),
    rssBtn: document.querySelector('button[aria-label="add"]'),
    feedbackEl: document.querySelector('p.feedback'),
  };

  const state = {
    feeds: [],
    rssForm: {
      valid: true,
      processState: 'filling',
      processError: null,
      errors: [],
      fields: {
        url: '',
      },
    },
  };

  const watchedState = getWatchedState(state, elements);

  const defaultLanguage = 'ru';
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  }).then(() => {
    yup.setLocale({
      string: {
        url: i18nInstance.t('errors.urlValid'),
      },
    });

    const schema = yup.object().shape({
      url: yup.string().url(),
    });

    elements.rssForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const value = formData.get('url');
      watchedState.rssForm.fields.url = value;
      watchedState.rssForm.processState = 'send';
      schema
        .validate(state.rssForm.fields)
        .then(() => {
          if (state.feeds.includes(value)) {
            watchedState.rssForm.valid = false;
            watchedState.rssForm.processError = i18nInstance.t('errors.dublicateFeed.errorName');
            watchedState.rssForm.errors = [i18nInstance.t('errors.dublicateFeed.errorMessage')];
          } else {
            watchedState.feeds.push(value);
            watchedState.rssForm.valid = true;
            watchedState.rssForm.processError = null;
            watchedState.rssForm.errors = [];
          }
        })
        .catch((error) => {
          watchedState.rssForm.processError = error.name;
          watchedState.rssForm.errors = [...error.errors];
          watchedState.rssForm.valid = false;
        });
      watchedState.rssForm.processState = 'filling';
    });
  });
};
