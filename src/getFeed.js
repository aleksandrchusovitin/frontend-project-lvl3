import axios from 'axios';

export default (link) => {
  const url = new URL(link, 'https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=');
  return axios.get(url.toString());
};
