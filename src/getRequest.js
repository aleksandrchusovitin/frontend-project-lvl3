import axios from 'axios';
import parser from './parser.js';

export default (url, watchedState) => {
  axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`)
    .then((data) => {
      const { feed, posts } = parser(url, data);
      watchedState.feeds.push(feed);
      watchedState.posts.push(...posts);
    })
    .catch((error) => {
      watchedState.rssForm.valid = false;
      watchedState.errors.NetworkError = [error]; // Как с этим быть?!
    });
};
