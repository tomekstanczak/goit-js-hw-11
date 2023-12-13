import axios from 'axios';
import Notiflix from 'notiflix';

const input = document.querySelector('input[type="text"]');
const search = document.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
const more = document.querySelector('.more-resaults');
const hiddenElement = document.querySelector('.more-hidden');
let searchValue;
let page = 1;
let perPage = 40;
let searchHits;

axios.defaults.baseURL = 'https://pixabay.com/api';
const keyAuthorization = '41134158-d3e94c46577e61eb60875764f&';

hiddenElement.style.display = 'none';

function cleaningSearchingGallery() {
  gallery.innerHTML = '';
}

async function picture() {
  try {
    const response = await axios.get(
      `/?key=${keyAuthorization}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response;
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function resaults(response) {
  const searchResponse = response.data;
  searchHits = searchResponse.totalHits;
  console.log(searchHits);
  for (let i = 0; i < searchHits; i++) {
    if (searchResponse.hits[i]) {
      hiddenElement.style.display = 'flex';
      console.log(searchHits);
      gallery.insertAdjacentHTML(
        'beforeend',
        `<div class="photo-card">
    <img src="${searchResponse.hits[i].webformatURL}" alt="${searchResponse.hits[i].tags}" class="pictures" loading="lazy">
    </img>
      <div class="info">
    <p class="info-item">
      <b>Likes</b> ${searchResponse.hits[i].likes}
    </p>    <p class="info-item">
      <b>Views</b> ${searchResponse.hits[i].views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${searchResponse.hits[i].comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${searchResponse.hits[i].downloads}
    </p>
  </div>
  </div>`
      );
    }
  }
  if (searchHits <= page * perPage) {
    hiddenElement.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
  if (searchHits === page * perPage) {
    hiddenElement.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

more.addEventListener('click', async e => {
  e.preventDefault();
  page += 1;
  try {
    const response = await picture(searchValue, page, perPage);
    resaults(response);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } finally {
    console.log('Done');
  }
});

input.addEventListener('input', ev => {
  searchValue = ev.target.value;
});

search.addEventListener('click', event => {
  event.preventDefault();
  cleaningSearchingGallery();
  page = 1;
  picture(searchValue, page, perPage)
    .then(response => {
      resaults(response);
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    })
    .finally(() => {
      console.log('Done');
    });
});
