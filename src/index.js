import './sass/main.scss';
import { refs } from './js/refs';
import axios from 'axios';
import renderMarkup from './js/renderMarkup';
import { Notify } from 'notiflix';

// const refs = {
//   searchForm: document.getElementById('search-form'),
//   gallery: document.querySelector('.gallery'),
// };

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  const form = e.currentTarget;
  const searchValue = form.elements.searchQuery.value; //no trim() because overload response

  getPicture(searchValue);
}

async function getPicture(searchValue) {
  try {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = 'key=26823171-490067530a76e346906bfc05d';
    if (searchValue) {
      const response = await axios.get(
        `${BASE_URL}?${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=4`,
      );
      const responseData = response.data.hits;

      await renderMarkup(responseData);
    }
  } catch (error) {
    console.error(error);
    Notify.failure(`${error}, please try again`);
  }
}

// async function getFetch(searchValue) {
//   try {
//     const BASE_URL = 'https://pixabay.com/api/';
//     const API_KEY = 'key=26823171-490067530a76e346906bfc05d';
//     if (searchValue) {
//       return await axios.get(
//         `${BASE_URL}?${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=4`,
//       );
//     }
//   } catch (error) {
//     console.error(error);
//     Notify.failure(`${error}, please try again`);
//   }
// }

// async function render() {
//   return await renderMarkup(getFetch.data.hits);
// }

// const options = {
//       key: 26823171-490067530a76e346906bfc05d,
//       image_type: photo,
//       orientation: horizontal,
//       safesearch: true,
//     };
