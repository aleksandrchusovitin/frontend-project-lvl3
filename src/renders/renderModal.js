export default (state, elements) => {
  const { modalContainer } = elements;
  const modalTitle = modalContainer.querySelector('.modal-title');
  const modalBody = modalContainer.querySelector('.modal-body');
  const modalMoreBtn = modalContainer.querySelector('.modal-footer .btn');

  modalTitle.innerHTML = '';
  modalBody.innerHTML = '';
  const currentPost = state.posts.postsList.find(({ id }) => id === state.modal.modalPostId);
  modalTitle.textContent = currentPost.name;
  modalBody.textContent = currentPost.description;
  modalMoreBtn.setAttribute('href', currentPost.link);
};
