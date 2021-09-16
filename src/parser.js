import axios from 'axios';
import _ from 'lodash';

export default (url, watchedState) => {
  axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`)
    .then((data) => {
      const content = data.data.contents;
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');

      const feedId = _.uniqueId();
      const feedName = doc.querySelector('channel title').textContent;
      const feedDescription = doc.querySelector('channel description').textContent;

      const feed = {
        id: feedId,
        name: feedName,
        description: feedDescription,
        url,
      };
      watchedState.feeds.push(feed);

      const items = doc.querySelectorAll('item');
      const posts = Array.from(items).map((item) => {
        const itemId = _.uniqueId();
        const itemName = item.querySelector('title').textContent;
        const itemLink = item.querySelector('link').nextSibling.textContent;
        const itemDescription = item.querySelector('description').textContent;

        return {
          id: itemId,
          feedId,
          name: itemName,
          description: itemDescription,
          link: itemLink,
        };
      });
      watchedState.posts.push(...posts);
    })
    .catch(console.log); // Что делаем с этой ошибкой?
};
