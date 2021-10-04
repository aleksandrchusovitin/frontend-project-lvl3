export default (url, data, i18nInstance) => {
  const content = data.data.contents;
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'application/xml');

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    throw new Error(i18nInstance.t('network.errors.invalidRss'));
  }

  const feedName = doc.querySelector('channel title').textContent;
  const feedDescription = doc.querySelector('channel description').textContent;

  const feed = {
    name: feedName,
    description: feedDescription,
    url,
  };

  const items = doc.querySelectorAll('item');
  const posts = Array.from(items).map((item) => {
    const itemName = item.querySelector('title').textContent;
    const itemLink = item.querySelector('link').nextSibling.textContent;
    const itemDescription = item.querySelector('description').textContent;

    return {
      name: itemName,
      description: itemDescription,
      link: itemLink,
    };
  });

  return { feed, posts };
};
