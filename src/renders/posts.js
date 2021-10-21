const buildListItem = (state, post) => {
  const { name, link, id } = post;

  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  const itemLink = document.createElement('a');

  if (state.posts.postsReadList.has(id)) {
    itemLink.classList.add('fw-normal', 'link-secondary');
  } else {
    itemLink.classList.add('fw-bold');
  }

  itemLink.setAttribute('href', link);
  itemLink.setAttribute('data-id', id);
  itemLink.setAttribute('target', '_blank');
  itemLink.setAttribute('rel', 'noopener noreferrer');
  itemLink.textContent = name;
  li.append(itemLink);

  return li;
};

const buildButton = (post, i18nInstance) => {
  const { id } = post;
  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  btn.setAttribute('type', 'button');
  btn.setAttribute('data-id', id);
  btn.setAttribute('data-bs-toggle', 'modal');
  btn.setAttribute('data-bs-target', '#modal');
  btn.textContent = i18nInstance.t('buttons.viewing');

  return btn;
};

export default (state, elements, i18nInstance) => {
  const { postsContainer } = elements;

  postsContainer.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18nInstance.t('titles.posts');
  cardBody.append(cardTitle);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const { postsList } = state.posts;
  const liElements = postsList.map((post) => {
    const li = buildListItem(state, post);
    const btn = buildButton(post, i18nInstance);
    li.append(btn);

    return li;
  });

  ul.append(...liElements);
  card.append(ul);
  postsContainer.append(card);
};
