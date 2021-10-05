export default (elements, process) => {
  const { rssForm } = elements;

  const isBlockedForm = (process === 'loading');
  // const isFillingForm = (process === 'filling');

  const row = document.createElement('div');
  row.classList.add('row');

  const col = document.createElement('div');
  col.classList.add('col');

  const formFloating = document.createElement('div');
  formFloating.classList.add('form-floating');
  const inputUrl = document.createElement('input');
  inputUrl.classList.add('form-control', 'w-100');
  inputUrl.setAttribute('id', 'url-input');
  inputUrl.setAttribute('name', 'url');
  inputUrl.setAttribute('aria-label', 'url');
  inputUrl.setAttribute('placeholder', 'ссылка RSS');
  inputUrl.setAttribute('autocomplete', 'off');
  inputUrl.setAttribute('autofocus', true);
  inputUrl.setAttribute('required', true);
  if (isBlockedForm) {
    inputUrl.setAttribute('readonly', true);
  }
  // if (isFillingForm) {
  //   inputUrl.focus();
  // }

  const labelInputUrl = document.createElement('label');
  labelInputUrl.setAttribute('for', 'url-input');
  labelInputUrl.textContent = 'Ссылка RSS';

  formFloating.append(inputUrl);
  formFloating.append(labelInputUrl);
  col.append(formFloating);

  const colAuto = document.createElement('div');
  colAuto.classList.add('col-auto');
  const btnAdd = document.createElement('button');
  btnAdd.classList.add('btn', 'btn-lg', 'btn-primary', 'h-100', 'px-sm-5');
  btnAdd.setAttribute('type', 'submit');
  btnAdd.setAttribute('aria-label', 'add');
  if (isBlockedForm) {
    btnAdd.setAttribute('disabled', true);
  }
  btnAdd.textContent = 'Добавить';

  colAuto.append(btnAdd);

  row.append(col);
  row.append(colAuto);

  rssForm.innerHTML = '';
  rssForm.append(row);
};
