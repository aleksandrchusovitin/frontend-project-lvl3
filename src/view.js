import onChange from 'on-change';
import renderFeeds from './renders/renderFeeds.js';
import renderPosts from './renders/renderPosts.js';
import renderModal from './renders/renderModal.js';
import renderClosingModal from './renders/renderClosingModal.js';
import renderFeedback from './renders/renderFeedback.js';

export default (state, elements, i18nInstance) => onChange(state, (path, currentValue) => {
  const {
    urlInput,
    rssBtn,
    rssForm,
  } = elements;

  if (path === 'rssForm.processState') {
    if (currentValue === 'send') {
      renderFeedback(elements);
      urlInput.setAttribute('readonly', true);
      rssBtn.disabled = true;
    }
    if (currentValue === 'filling') {
      rssForm.reset();
      rssBtn.disabled = false;
      urlInput.removeAttribute('readonly');
      urlInput.focus();
    }
    if (currentValue === 'success') {
      const text = i18nInstance.t('network.success');
      renderFeedback(elements, text);
    }
  }

  if (path === 'errors.validationError') {
    if (currentValue !== null) {
      renderFeedback(elements, currentValue, false);
    } else {
      renderFeedback(elements);
    }
  }

  if (path === 'errors.networkError') {
    if (currentValue === 'Network Error') {
      renderFeedback(elements, i18nInstance.t('network.errors.connectionError'), false);
    } else if (currentValue === null) {
      renderFeedback(elements);
    } else {
      renderFeedback(elements, currentValue, false);
    }
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
