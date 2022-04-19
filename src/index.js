import './sass/main.scss';
import { refs } from './js/refs';
import fetchPicture from './js/fetch';
import renderMarkup from './js/renderMarkup';

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  const form = e.currentTarget;
  const searchValue = form.elements.searchQuery.value; //no trim() because overload response

  const response = await fetchPicture(searchValue);

  await renderMarkup(response.data.hits);
}
