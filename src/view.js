import onChange from 'on-change';
import renderFeeds from './renders/feeds.js';
import renderPosts from './renders/posts.js';
import renderModal from './renders/modal.js';
import renderFeedback from './renders/feedback.js';
import renderForm from './renders/form.js';

export default (state, elements, i18nInstance) => {
  const watchedState = onChange(state, (path, currentValue) => {
    if (path === 'rssForm.state') {
      if (currentValue === 'completed' || currentValue === 'error') {
        renderFeedback(elements, state, i18nInstance);
      }
      renderForm(elements, state);
    }

    if (path === 'feeds') {
      renderFeeds(state, elements, i18nInstance);
    }

    if (path === 'posts.postsList' || path === 'posts.postsReadList') {
      renderPosts(state, elements, i18nInstance);
    }

    if (path === 'modal.modalPostId') {
      renderModal(state, elements);
    }
  });

  return watchedState;
};
