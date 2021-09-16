import onChange from 'on-change';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';

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
      // feedbackEl.textContent = i18nInstance.t('validation.success'); // И здесь тоже!
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
    if (currentValue.length === 0) {
      console.log(i18nInstance.t('validation.success'));
      console.log(feedbackEl);
      feedbackEl.textContent = i18nInstance.t('validation.success'); // Почему не добавляется текст?
    }
    const [validationError] = currentValue;
    feedbackEl.textContent = validationError;
  }

  if (path === 'feeds') {
    renderFeeds(state, elements, i18nInstance);
  }

  if (path === 'posts') {
    renderPosts(state, elements, i18nInstance);
  }
});
