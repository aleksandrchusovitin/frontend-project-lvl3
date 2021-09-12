// @ts-check

import * as yup from 'yup';
import onChange from 'on-change';

export default () => {
  const schema = yup.object().shape({
    url: yup.string().url(),
  });

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

  const rssForm = document.querySelector('.rss-form');
  const urlInput = rssForm.querySelector('input[aria-label="url"]');
  const rssBtn = rssForm.querySelector('button[aria-label="add"]');

  urlInput.addEventListener('input', (e) => {
    const { value } = e.target;
    state.rssForm.fields.url = value;
    schema
      .isValid(state.rssForm.fields)
      .then((isValidValue) => {
        state.rssForm.valid = isValidValue;
      })
      .catch((error) => {
        state.rssForm.processState = error.name;
        state.rssForm.errors = [...state.rssForm.errors, ...error.errors];
      });
  });

  const watchedState = onChange(state, (path, currentValue, prevValue) => {
    console.log(path);
    if (path === 'rssForm.valid') {
      console.log('!!!');
    }
  });
};
