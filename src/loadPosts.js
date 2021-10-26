import _ from 'lodash';
import parser from './parser.js';

export default (requests, state) => Promise
  .all(requests)
  .then((data) => data.map((feed) => {
    const { posts } = parser(feed.url, feed);
    const newPosts = _.differenceBy(posts, state.posts.postsList, 'link');

    const newPostsWithId = newPosts.map((newPost) => ({
      ...newPost,
      id: _.uniqueId(),
      feedId: feed.id,
    }));

    return newPostsWithId;
  }));
