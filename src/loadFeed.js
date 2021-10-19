import getFeed from './getFeed.js';
import parser from './parser.js';

export default (link) => getFeed(link).then((data) => parser(link, data));
