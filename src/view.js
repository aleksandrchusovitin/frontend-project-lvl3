import onChange from 'on-change';
import renderFeeds from './renders/renderFeeds.js';
import renderPosts from './renders/renderPosts.js';
import renderModal from './renders/renderModal.js';
import renderClosingModal from './renders/renderClosingModal.js';
import renderFeedback from './renders/renderFeedback.js';
import renderForm from './renders/renderForm.js';

export default (state, elements, i18nInstance) => onChange(state, (path, currentValue) => {
  if (path === 'rssForm.processState') {
    if (currentValue === 'completed') {
      const text = i18nInstance.t('network.success');
      renderFeedback(elements, text);
    }
    renderForm(elements, currentValue, i18nInstance);
  }

  if (path === 'error') {
    if (currentValue !== null) {
      renderFeedback(elements, currentValue, false);
    } else {
      renderFeedback(elements);
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
