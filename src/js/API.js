import axios from 'axios';

export default class API {
  constructor() {
    this.options = {
      params: {
        key: '26823171-490067530a76e346906bfc05d',
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 4,
      },
    };
  }

  async getPictures() {
    const response = await axios.get('https://pixabay.com/api/', this.options);
    this.nextPage();
    return response;
  }

  nextPage() {
    this.options.params.page += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  get searchQuery() {
    return this.options.params.q;
  }

  set searchQuery(newQuery) {
    this.options.params.q = newQuery;
  }

  get pageNumber() {
    return this.options.params.page;
  }

  set pageNumber(newNumber) {
    this.options.params.page = newNumber;
  }
}
