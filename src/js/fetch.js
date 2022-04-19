import axios from 'axios';
import { Notify } from 'notiflix';
export default async function fetchPicture(val) {
  try {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = 'key=26823171-490067530a76e346906bfc05d';
    if (val) {
      return await axios.get(`${BASE_URL}?${API_KEY}`, {
        params: {
          q: val,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: 1,
          per_page: 4,
        },
      });
    }
    Notify.info('Search field cannot be empty');
  } catch (error) {
    console.error(error);
    Notify.failure(`${error}, please try again`);
  }
}
