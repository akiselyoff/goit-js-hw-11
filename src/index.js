import './sass/main.scss';
import axios from 'axios';
import markup from './js/markup';
import { Notify } from 'notiflix';

// console.log('oooooo');
// Notify.success('ok');

const refs = {
  searchForm: document.getElementById('search-form'),
};

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchValue = form.elements.searchQuery.value;
  getPicture(searchValue);

  //   console.dir(searchValue);
}

async function getPicture(searchValue) {
  try {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = 'key=26823171-490067530a76e346906bfc05d';

    const response = await axios.get(
      `${BASE_URL}?${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`,
    );
    console.log(response.data.hits);
    return response.data.hits;
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// async function renderData(arr) {
//   console.log(arr.data.hits);
// }

// renderData(getPicture);

// const options = {
//       image_type: photo,
//       orientation: horizontal,
//       safesearch: true,
//     };
