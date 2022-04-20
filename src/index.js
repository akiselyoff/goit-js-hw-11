import './sass/main.scss';
import { Notify } from 'notiflix';
import { refs } from './js/refs';
import API from './js/API';
import renderMarkup from './js/renderMarkup';

const loadService = new API();

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();

  const searchValue = e.currentTarget.elements.searchQuery.value;
  if (searchValue) {
    refs.searchBtn.disabled = true;
    loadService.searchQuery = searchValue;
    loadService.resetPage();
    refs.gallery.innerHTML = '';
    loadPictures();
  }
}

function loadPictures() {
  loadService
    .getPictures()
    .then(dataProcessing)
    .catch(error => {
      console.log(error);
      Notify.failure('Something went wrong, please try again...');
    });
}

function dataProcessing(response) {
  refs.searchBtn.disabled = false;
  if (response.data.totalHits === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }
  if (response.data.totalHits !== 0 && response.data.hits.length === 0) {
    Notify.warning(`We're sorry, but you've reached the end of search results.`);
    return;
  }

  renderMarkup(response.data.hits);
}
