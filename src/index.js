import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'debounce';
import Notiflix from 'notiflix';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}50`;
}
const DEBOUNCE_DELAY = 300;
const MAX_COUNTRY = 10;
const inputCounrtry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

inputCounrtry.addEventListener('input', debounce(onCountryChenge, DEBOUNCE_DELAY));

function onCountryChenge() {
  const nameCountry = inputCounrtry.value.trim();
  console.log(nameCountry);
  if (nameCountry) {
    fetchCountries(nameCountry)
      .then(arrCountrys => {
        console.log(arrCountrys);
        if (arrCountrys.length > MAX_COUNTRY) {
          countryList.innerHTML = '';
          Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
        } else {
          const htmlEl = arrCountrys => {
            return arrCountrys.map(country => {
              console.log('флаг в консоль вам: ', country.flags.svg);
              return `<li style = 'background-color:${getRandomHexColor()}'>
              <p>Страна: <span class="name-official">${country.name.official}</span></p>
              <p>столица: <span class="capital">${country.capital.join('')}</span></p>
              <div>флаг: <img class='flagImg' src="${country.flags.svg}" alt="флаг страны" /></div>
              <p>языки: <span class="languages">${Object.values(country.languages).join(
                '',
              )}</span></p>
              <p>население: <span class="population">${country.population}</span></p>
              </li>`;
            });
          };
          countryList.innerHTML = htmlEl(arrCountrys).join('');
        }
      })
      .catch(error => {
        countryList.innerHTML = '';
        Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
      });
  }
}

//<p>Страна: <span class="name-official">${name.official}</span></p>
// <p>флаг: <span class="flags">${flags}</span></p>
//<p>столица: <span class="capital">${capital}</span></p>
//<p>население: <span class="population">${population}</span></p>
//<p>языки: <span class="languages">${languages}</span></p>
