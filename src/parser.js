export default (content) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'application/xml');

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    const error = new Error(parseError.textContent);
    error.isParsingError = true;
    throw error;
  }

  const feedName = doc.querySelector('channel title').textContent;
  const feedDescription = doc.querySelector('channel description').textContent;

  const feed = {
    name: feedName,
    description: feedDescription,
  };

  const items = doc.querySelectorAll('item');
  const posts = Array.from(items).map((item) => {
    const itemName = item.querySelector('title').textContent;
    const itemLink = item.querySelector('link').textContent;
    const itemDescription = item.querySelector('description').textContent;

    return {
      name: itemName,
      description: itemDescription,
      link: itemLink,
    };
  });

  return { feed, posts };
};
