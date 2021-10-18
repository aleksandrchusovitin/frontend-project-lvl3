import getRequest from './getRequest.js';
import parser from './parser.js';

export default (currentUrl) => getRequest(currentUrl).then((data) => parser(currentUrl, data));
