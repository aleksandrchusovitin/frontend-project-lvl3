import axios from 'axios';
import parser from './parser.js';

export default (url, watchedState) => {
  const newWatchedState = watchedState; // Понимаю, что это очень плохо :)
  axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`)
    .then((data) => {
      const { feed, posts } = parser(url, data);
      watchedState.feeds.push(feed);
      watchedState.posts.push(...posts);
    })
    .catch((error) => {
      newWatchedState.rssForm.valid = false;
      newWatchedState.errors.NetworkError = [error];
    });
};
