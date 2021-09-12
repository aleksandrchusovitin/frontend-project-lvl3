import onChange from 'on-change';

export default (state, elements) => onChange(state, (path, currentValue) => {
  const {
    urlInput,
    rssBtn,
    rssForm,
    feedbackEl,
  } = elements;

  if (path === 'rssForm.valid') {
    if (!currentValue) {
      urlInput.classList.add('is-invalid');
    } else {
      urlInput.classList.remove('is-invalid');
    }
  }
  if (path === 'rssForm.processState') {
    if (currentValue === 'send') {
      rssBtn.disabled = true;
    }
    if (currentValue === 'filling') {
      rssForm.reset();
      rssBtn.disabled = false;
      urlInput.focus();
    }
  }

  if (path === 'rssForm.errors') {
    feedbackEl.textContent = currentValue.join(',');
  }
});
