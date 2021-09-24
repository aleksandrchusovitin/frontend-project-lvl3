export default (elements) => {
  const { modalContainer } = elements;
  const modalTitle = modalContainer.querySelector('.modal-title');
  const modalBody = modalContainer.querySelector('.modal-body');
  const modalMoreBtn = modalContainer.querySelector('.modal-footer .btn');

  modalTitle.innerHTML = '';
  modalBody.innerHTML = '';

  modalMoreBtn.setAttribute('href', '#');
};
