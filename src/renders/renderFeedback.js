export default (elements, text = '', isNotError = true) => {
  const { urlInput, feedbackEl } = elements;

  if (isNotError) {
    urlInput.classList.remove('is-invalid');
    feedbackEl.classList.add('text-success');
    feedbackEl.classList.remove('text-danger');
  } else {
    urlInput.classList.add('is-invalid');
    feedbackEl.classList.add('text-danger');
    feedbackEl.classList.remove('text-success');
  }
  feedbackEl.textContent = text;
};
