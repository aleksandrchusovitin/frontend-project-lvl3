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

  // if (path === 'rssForm.valid') {
  //   renderFeedback(elements, currentValue);
  // }

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
      const text = i18nInstance.t('network.success');
      renderFeedback(elements, text);
    }
  }

  if (path === 'errors.ValidationError') {
    const [validationError] = currentValue;
    const text = validationError;
    renderFeedback(elements, text, false);
  }

  if (path === 'errors.NetworkError') {
    const text = i18nInstance.t('network.errors.connectionError');
    renderFeedback(elements, text, false);
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
