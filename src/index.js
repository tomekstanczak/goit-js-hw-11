import axios from 'axios';

const input = document.querySelector('input[type="text"]');
const search = document.querySelector('button[type="submit"]');
let searchValue;

const picture = () => {
  return axios.get(
    'https://pixabay.com/api/?key=41134158-d3e94c46577e61eb60875764f&q=yellow&image_type=photo'
  );
};

input.addEventListener('input', ev => {
  searchValue = ev.target.value;
});

search.addEventListener('submit', event => {
  event.preventDefault();
  picture(searchValue)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(`error!!! ${error}`);
    })
    .finally(() => {
      console.log('Well done');
    });
});
