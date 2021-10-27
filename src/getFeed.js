import axios from 'axios';

const proxyfy = (link) => {
  const url = new URL('https://hexlet-allorigins.herokuapp.com/get');
  url.searchParams.set('url', link);
  url.searchParams.set('disableCache', 'true');

  return url;
};

export default (url) => {
  const link = proxyfy(url).toString();
  return axios.get(link);
};
