export default (elements, value, isNotError = true, i18nInstance) => {
  const { urlInput, feedbackEl } = elements;

  let text;
  if (isNotError) {
    urlInput.classList.remove('is-invalid');
    feedbackEl.classList.add('text-success');
    feedbackEl.classList.remove('text-danger');
    text = i18nInstance.t(`network.${value}`);
  } else {
    urlInput.classList.add('is-invalid');
    feedbackEl.classList.add('text-danger');
    feedbackEl.classList.remove('text-success');
    text = i18nInstance.t(`network.errors.${value}`);
  }
  console.log(text);
  feedbackEl.textContent = text;
};
