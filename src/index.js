import './sass/main.scss';
import axios from 'axios';
import markup from './js/markup';
import { Notify } from 'notiflix';

const refs = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  const form = e.currentTarget;
  const searchValue = form.elements.searchQuery.value;

  getPicture(searchValue);
}

async function getPicture(searchValue) {
  try {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = 'key=26823171-490067530a76e346906bfc05d';
    if (searchValue) {
      const getFetch = await axios.get(
        `${BASE_URL}?${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`,
      );

      const render = await markup(getFetch.data.hits);

      await renderMarkup(render);
    }
  } catch (error) {
    console.error(error);
    Notify.failure(`${error}, please try again`);
  }
}

async function renderMarkup(htmlMarkup) {
  refs.gallery.insertAdjacentHTML('beforeend', htmlMarkup);
}

// const options = {
//       key: 26823171-490067530a76e346906bfc05d,
//       image_type: photo,
//       orientation: horizontal,
//       safesearch: true,
//     };
