import axios from 'axios';

const proxyfy = (url) => new URL(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`);

export default (url) => {
  const link = proxyfy(url).toString();
  return axios.get(link);
};
