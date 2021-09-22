import axios from 'axios';
import _ from 'lodash';
import parser from './parser.js';

export default (url, watchedState, state) => {
  const getNewItems = (currentItems, itemsInState, diffValue) => (
    _.differenceBy(currentItems, itemsInState, diffValue));

  const newWatchedState = watchedState; // Понимаю, что это очень плохо :)
  const tick = () => {
    axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`)
      .then((data) => {
        const { feed, posts } = parser(url, data);
        const feedId = _.uniqueId();
        const newFeeds = getNewItems([feed], state.feeds, 'url');
        const newPosts = getNewItems(posts, state.posts, 'link');

        const newFeedsWithId = newFeeds
          .map((newFeed) => ({ ...newFeed, id: feedId }));
        const newPostsWithId = newPosts
          .map((newPost) => ({ ...newPost, id: _.uniqueId(), feedId }));

        newWatchedState.feeds.push(...newFeedsWithId);
        newWatchedState.posts.push(...newPostsWithId);
      })
      .catch((error) => {
        newWatchedState.rssForm.valid = false;
        newWatchedState.errors.NetworkError = [error];
      });
    setTimeout(tick, 5000);
  };
  setTimeout(tick, 5000);
};
