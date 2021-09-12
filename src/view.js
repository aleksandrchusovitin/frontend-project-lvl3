import onChange from 'on-change';

export default (state, elements) => onChange(state, (path, currentValue) => {
  if (path === 'rssForm.valid') {
    if (!currentValue) {
      elements.urlInput.classList.add('is-invalid');
    } else {
      elements.urlInput.classList.remove('is-invalid');
    }
  }
  if (path === 'rssForm.processState') {
    if (currentValue === 'send') {
      elements.rssBtn.setAttribute('disabled', 'disabled');
    }
    if (currentValue === 'filling') {
      elements.rssForm.reset();
      elements.rssBtn.removeAttribute('disabled');
      elements.urlInput.focus();
    }
  }

  // if (path === 'rssForm.errors') {
  //   feedbackEl.textContent = currentValue.join(',');
  // }
});
