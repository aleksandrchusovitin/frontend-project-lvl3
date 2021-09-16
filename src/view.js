import onChange from 'on-change';
import parser from './parser.js';

export default (state, elements, i18nInstance) => onChange(state, (path, currentValue) => {
  const {
    urlInput,
    rssBtn,
    rssForm,
    feedbackEl,
  } = elements;

  if (path === 'rssForm.valid') {
    if (!currentValue) {
      urlInput.classList.add('is-invalid');
      feedbackEl.classList.add('text-danger');
      feedbackEl.classList.remove('text-success');
    } else {
      urlInput.classList.remove('is-invalid');
      feedbackEl.classList.add('text-success');
      feedbackEl.classList.remove('text-danger');
      feedbackEl.textContent = i18nInstance.t('validation.success'); // ?
      parser(state);
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

  if (path === 'errors.ValidationError') {
    const [validationError] = currentValue;
    feedbackEl.textContent = validationError;
  }
});
