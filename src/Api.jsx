import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30718682-af518003791b64ef378c3a060';

export async function fetchImages(term, page) {
  const options = {
		params: {
			q: term,
			page: page,
			key: API_KEY,
			image_type: 'photo',
			orientation: 'horizontal',
			per_page: 12,			
    },
	};
	const response = await axios.get(`${BASE_URL}`, options);

  return response.data.hits;
}
