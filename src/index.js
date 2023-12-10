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

function picture() {
  return axios.get(
    `/?key=${keyAuthorization}q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
}
function cleaningSearchingGallery() {
  let pictures;
  if ((pictures = document.querySelector('.pictures')) !== null) {
    gallery.innerHTML = '';
  } else {
    console.log('It is working');
  }
}

function resaults(response) {
  const searchResponse = response.data;
  searchHits = searchResponse.totalHits;
  console.log(searchHits);
  for (let i = 0; i < searchHits; i++) {
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
  if (searchHits <= page * perPage) {
    moreBtn.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

more.addEventListener('click', e => {
  e.preventDefault();
  page += 1;
  picture(searchValue, page, perPage)
    .then(response => {
      resaults(response);
    })
    .catch(error => {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    })
    .finally(() => {
      console.log('Done');
    });
});

input.addEventListener('input', ev => {
  searchValue = ev.target.value;
});

search.addEventListener('click', event => {
  event.preventDefault();
  cleaningSearchingGallery();
  picture(searchValue, page, perPage)
    .then(response => {
      resaults(response);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    })
    .finally(() => {
      console.log('Done');
    });
});
