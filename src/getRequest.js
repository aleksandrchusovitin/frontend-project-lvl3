import axios from 'axios';
import _ from 'lodash';
import parser from './parser.js';

export default (url, watchedState, state) => {
  const getNewItems = (currentItems, itemsInState, diffValue) => (
    _.differenceBy(currentItems, itemsInState, diffValue));

  const newWatchedState = watchedState; // Понимаю, что это очень плохо :)
  const tick = () => {
    const timeoutId = setTimeout(tick, 5000);
    axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`)
      .then((data) => {
        const { feed, posts } = parser(url, data);
        const feedId = _.uniqueId();
        const newFeeds = getNewItems([feed], state.feeds, 'url');
        const newPosts = getNewItems(posts, state.posts.postsList, 'link');

        const newFeedsWithId = newFeeds
          .map((newFeed) => ({ ...newFeed, id: feedId }));
        const newPostsWithId = newPosts
          .map((newPost) => ({ ...newPost, id: _.uniqueId(), feedId }));

        newWatchedState.feeds.push(...newFeedsWithId);
        newWatchedState.posts.postsList.push(...newPostsWithId);
        newWatchedState.rssForm.processState = 'success';
      })
      .catch((error) => {
        newWatchedState.errors.networkError = [error.message];
        if (error.message !== 'Network Error') {
          clearTimeout(timeoutId);
        }
      });
  };
  setTimeout(tick, 5000);
};
