import axios from 'axios';
import _ from 'lodash';

export default (state) => {
  const { url } = state.rssForm.fields;
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

      state.feeds.push(feed);
      console.log(state);
      console.log(doc);
    })
    .catch(console.log);
};
