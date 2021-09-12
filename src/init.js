// @ts-check

import * as yup from 'yup';
import onChange from 'on-change';

export default () => {
  const schema = yup.object().shape({
    url: yup.string().url(),
  });

  const rssForm = document.querySelector('.rss-form');
  const urlInput = rssForm.querySelector('input[aria-label="url"]');
  // const rssBtn = rssForm.querySelector('button[aria-label="add"]');

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
    console.log(state);
    if (path === 'rssForm.valid') {
      if (!currentValue) {
        urlInput.classList.add('is-invalid');
        urlInput.classList.remove('is-valid');
      } else {
        urlInput.classList.add('is-valid');
        urlInput.classList.remove('is-invalid');
      }
    }
  });

  rssForm.addEventListener('submit', (e) => {
    console.log('!!!!!');
    e.preventDevault();
    const formData = new FormData(e.target);
    const value = formData.get('url');
    console.log(value);
    // watchedState.rssForm.fields.url = value;
    schema
      .validate(state.rssForm.fields)
      .catch((error) => {
        if (error) {
          watchedState.rssForm.processError = error.name;
          watchedState.rssForm.errors = [...error.errors];
          watchedState.rssForm.valid = false;
        } else {
          watchedState.rssForm.processError = null;
          watchedState.rssForm.errors = [];
          watchedState.rssForm.valid = true;
        }
      });
  });
};
