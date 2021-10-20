export default (elements, state, i18nInstance) => {
  const { feedbackContainer } = elements;

  feedbackContainer.innerHTML = '';
  const exampleUrlElement = document.createElement('p');
  exampleUrlElement.classList.add('mt-2', 'mb-0', 'text-muted');
  exampleUrlElement.textContent = 'Пример: https://ru.hexlet.io/lessons.rss';

  const feedbackElement = document.createElement('p');
  feedbackElement.classList.add('feedback', 'm-0', 'position-absolute', 'small');
  if (state.rssForm.error !== null) {
    feedbackElement.classList.add('text-danger');
    feedbackElement.textContent = i18nInstance.t(`feedbackMessages.${state.rssForm.error}`);
  } else {
    feedbackElement.classList.add('text-success');
    feedbackElement.textContent = i18nInstance.t('feedbackMessages.success');
  }

  feedbackContainer.append(exampleUrlElement, feedbackElement);
};
