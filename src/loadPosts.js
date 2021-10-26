import _ from 'lodash';
import parser from './parser.js';
import getFeed from './getFeed.js';

export default (state) => {
  const requests = state.feeds.map((feed) => getFeed(feed.url));
  return Promise
    .all(requests)
    .then((data) => data.map((feed) => {
      const { posts } = parser(feed);
      const newPosts = _.differenceBy(posts, state.posts.postsList, 'link');

      const newPostsWithId = newPosts.map((newPost) => ({
        ...newPost,
        id: _.uniqueId(),
        feedId: feed.id,
      }));

      return newPostsWithId;
    }));
};
