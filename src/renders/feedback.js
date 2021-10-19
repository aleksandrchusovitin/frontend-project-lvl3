export default (elements, value = '', isNotError = true, i18nInstance) => {
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
  const text = i18nInstance.t(`feedbackMessages.${value}`);
  feedbackEl.textContent = text;
};
