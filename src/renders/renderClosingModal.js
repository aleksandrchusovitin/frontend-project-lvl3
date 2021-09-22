export default (elements) => {
  const { modalContainer } = elements;
  const modalTitle = modalContainer.querySelector('.modal-title');
  const modalBody = modalContainer.querySelector('.modal-body');
  const modalMoreBtn = modalContainer.querySelector('.modal-footer .btn');
  const backdrop = document.querySelector('.modal-backdrop');
  const { body } = document;

  modalContainer.classList.remove('show');
  modalContainer.style.display = 'none';
  modalContainer.removeAttribute('aria-modal');
  modalContainer.setAttribute('aria-hidden', 'true');

  body.classList.remove('modal-open');
  body.style.removeProperty('overflow');
  body.style.removeProperty('paddingRight');

  modalTitle.innerHTML = '';
  modalBody.innerHTML = '';

  modalMoreBtn.setAttribute('href', '#');

  body.removeChild(backdrop);
};
