import axios from 'axios';
import _ from 'lodash';
import parser from './parser.js';

export default (url, watchedState, state) => {
  const newWatchedState = watchedState; // Понимаю, что это очень плохо :)
  const tick = () => {
    axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`)
      .then((data) => {
        const { feed, posts } = parser(url, data);

        const newFeeds = _.differenceBy([feed], state.feeds, 'url');
        const newPosts = _.differenceBy(posts, state.posts, 'link');

        newWatchedState.feeds.push(...newFeeds);
        newWatchedState.posts.push(...newPosts);
      })
      .catch((error) => {
        newWatchedState.rssForm.valid = false;
        newWatchedState.errors.NetworkError = [error];
      });
    setTimeout(tick, 5000);
  };
  setTimeout(tick, 5000);
};
