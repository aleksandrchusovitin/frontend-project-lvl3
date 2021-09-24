export default (state, elements) => {
  const { modalContainer } = elements;
  const modalTitle = modalContainer.querySelector('.modal-title');
  const modalBody = modalContainer.querySelector('.modal-body');
  const modalMoreBtn = modalContainer.querySelector('.modal-footer .btn');
  // const { body } = document;

  // modalContainer.classList.add('show');
  // modalContainer.style.display = 'block';
  // modalContainer.setAttribute('aria-modal', 'true');
  // modalContainer.removeAttribute('aria-hidden');

  // body.classList.add('modal-open');
  // body.style.overflow = 'hidden';
  // body.style.paddingRight = '17px';

  modalTitle.innerHTML = '';
  modalBody.innerHTML = '';
  const currentPost = state.posts.postsList.find(({ id }) => id === state.modal.modalPostId);
  modalTitle.textContent = currentPost.name;
  modalBody.textContent = currentPost.description;
  modalMoreBtn.setAttribute('href', currentPost.link);

  // const backdrop = document.createElement('div');
  // backdrop.classList.add('modal-backdrop', 'fade', 'show');
  // body.append(backdrop);
};
