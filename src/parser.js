export default (url, data) => {
  const content = data.data.contents;
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');

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
