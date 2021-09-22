import onChange from 'on-change';
import renderFeeds from './renders/renderFeeds.js';
import renderPosts from './renders/renderPosts.js';
import renderModal from './renders/renderModal.js';
import renderClosingModal from './renders/renderClosingModal.js';

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
    if (currentValue === 'success') {
      feedbackEl.textContent = i18nInstance.t('network.success');
    }
  }

  if (path === 'errors.ValidationError') {
    const [validationError] = currentValue;
    feedbackEl.textContent = validationError;
  }

  if (path === 'errors.NetworkError') {
    feedbackEl.textContent = i18nInstance.t('network.errors.connectionError');
  }

  if (path === 'feeds') {
    renderFeeds(state, elements, i18nInstance);
  }

  if (path === 'posts.postsList' || path === 'posts.postsReadList') {
    renderPosts(state, elements, i18nInstance);
  }

  if (path === 'modal.modalState') {
    if (currentValue === 'opened') {
      renderModal(state, elements);
    }
    if (currentValue === 'closed') {
      renderClosingModal(elements);
    }
  }
});
