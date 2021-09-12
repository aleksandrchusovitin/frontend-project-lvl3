import * as yup from 'yup';
import getWatchedState from './view.js';

export default () => {
  const schema = yup.object().shape({
    url: yup.string().url(),
  });

  const elements = {
    rssForm: document.querySelector('.rss-form'),
    urlInput: document.querySelector('input[aria-label="url"]'),
    rssBtn: document.querySelector('button[aria-label="add"]'),
  };
  // const feedbackEl = document.querySelector('p.feedback');

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
          watchedState.rssForm.processError = 'Dublicate feed';
          watchedState.rssForm.errors = ['Dublicate feed'];
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
};
