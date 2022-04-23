import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const KEY = '26823171-490067530a76e346906bfc05d';

export default class ServiceAPI {
  constructor() {
    this.options = {
      params: {
        key: `${KEY}`,
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
      },
    };
  }

  async getPictures() {
    try {
      const response = await axios.get(`${URL}`, this.options);
      await this.nextPage();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async nextPage() {
    this.options.params.page += 1;
  }

  resetPage() {
    this.options.params.page = 1;
  }

  get searchQuery() {
    return this.options.params.q;
  }

  set searchQuery(newQuery) {
    this.options.params.q = newQuery;
  }
}
