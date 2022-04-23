import './sass/main.scss';
import { Notify } from 'notiflix';
import { refs } from './js/refs';
import ServiceAPI from './js/API';
// import LoadMoreBtn from './js/loadMore';
import renderMarkup from './js/renderMarkup';

const API = new ServiceAPI();

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', onChangeSearchValue);
refs.loadMore.addEventListener('click', onloadMore);

hideLoadMore();

function onSubmit(e) {
  e.preventDefault();

  const searchValue = e.currentTarget.elements.searchQuery.value.trim();
  if (searchValue) {
    refs.searchBtn.disabled = true;
    API.searchQuery = searchValue;
    API.resetPage();
    refs.gallery.innerHTML = '';
    loadPictures();
  }
  if (searchValue === '') Notify.warning('Searching field must not be empty');
}

async function onloadMore() {
  loadPictures();
}

async function loadPictures() {
  try {
    const response = await API.getPictures();
    const isDataValid = await searchValueCheck(response);
    renderMarkup(isDataValid);
  } catch (error) {
    console.error(error);
    Notify.failure(error);
  }

  refs.searchBtn.disabled = false;
}

async function searchValueCheck(response) {
  if (response.data.totalHits === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }
  if (response.data.totalHits !== 0 && response.data.hits.length === 0) {
    hideLoadMore();
    Notify.warning(`We're sorry, but you've reached the end of search results.`);
    return;
  }
  showLoadMore();

  return response.data.hits;
}

function onChangeSearchValue() {
  hideLoadMore();
  refs.gallery.innerHTML = '';
  API.resetPage();
}

function hideLoadMore() {
  refs.loadMore.classList.add('hidden');
}
function showLoadMore() {
  refs.loadMore.classList.remove('hidden');
}
