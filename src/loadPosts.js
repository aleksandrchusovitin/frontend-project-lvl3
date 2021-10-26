import _ from 'lodash';
import parser from './parser.js';
import getFeed from './getFeed.js';

export default (watchedState) => {
  const requests = watchedState.feeds.map((feed) => getFeed(feed.url));
  return Promise
    .all(requests)
    .then((data) => data.forEach((feed) => {
      const { posts } = parser(feed);
      const newPosts = _.differenceBy(posts, watchedState.posts.postsList, 'link');

      const newPostsWithId = newPosts.map((newPost) => ({
        ...newPost,
        id: _.uniqueId(),
        feedId: feed.id,
      }));

      watchedState.posts.postsList.push(...newPostsWithId);
    }));
};
