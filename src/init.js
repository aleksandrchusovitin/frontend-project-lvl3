// @ts-check

import * as yup from 'yup';
import onChange from 'on-change';

export default () => {
  const schema = yup.object().shape({
    url: yup.string().url(),
  });

  const rssForm = document.querySelector('.rss-form');
  const urlInput = rssForm.querySelector('input[aria-label="url"]');
  const rssBtn = rssForm.querySelector('button[aria-label="add"]');
  const feedbackEl = document.querySelector('p.feedback');

  const state = {
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

  const watchedState = onChange(state, (path, currentValue) => {
    if (path === 'rssForm.valid') {
      if (!currentValue) {
        urlInput.classList.add('is-invalid');
        urlInput.classList.remove('is-valid');
      } else {
        urlInput.classList.remove('is-invalid');
      }
    }

    if (path === 'rssForm.processState') {
      if (currentValue === 'send') {
        rssBtn.disabled = true;
      }
      if (currentValue === 'filling') {
        rssForm.reset();
        rssBtn.disabled = false;
        urlInput.focus();
      }
    }

    if (path === 'rssForm.errors') {
      feedbackEl.textContent = currentValue.join(',');
    }
  });

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url');
    watchedState.rssForm.fields.url = value;
    watchedState.rssForm.processState = 'send';
    schema
      .validate(state.rssForm.fields)
      .then(() => {
        watchedState.rssForm.processError = null;
        watchedState.rssForm.errors = [];
        watchedState.rssForm.valid = true;
      })
      .catch((error) => {
        watchedState.rssForm.processError = error.name;
        watchedState.rssForm.errors = [...error.errors];
        watchedState.rssForm.valid = false;
      });
    watchedState.rssForm.processState = 'filling';
  });
};
