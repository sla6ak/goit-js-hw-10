import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'debounce';
import Notiflix from 'notiflix';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}50`;
}
const DEBOUNCE_DELAY = 300;
const inputCounrtry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

inputCounrtry.addEventListener('input', debounce(onCountryChenge, DEBOUNCE_DELAY));

function onCountryChenge() {
  let MAX_COUNTRY = document.querySelector('#max-country').value;
  let DETALY = document.querySelector('#detaly').checked;
  const nameCountry = inputCounrtry.value.trim();
  if (nameCountry) {
    fetchCountries(nameCountry)
      .then(arrCountrys => {
        if (arrCountrys.length > MAX_COUNTRY) {
          countryList.innerHTML = '';
          Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
        } else {
          const htmlEl = arrCountrys => {
            return arrCountrys.map((country, index, arrey) => {
              if (DETALY == true || arrey.length === 1) {
                return `<li style = 'background-color:${getRandomHexColor()}'>
              <p>Страна: <span class="name-official">${country.name.official}</span></p>
              <p>Столица: <span class="capital">${country.capital.join('')}</span></p>
              <div>Флаг: <img class='flagImg' src="${country.flags.svg}" alt="флаг страны" /></div>
              <p>Языки: <span class="languages">${Object.values(country.languages).join(
                '',
              )}</span></p>
              <p>Население: <span class="population">${country.population}</span></p>
              </li>`;
              } else {
                return `<li style = 'background-color:${getRandomHexColor()}'>
                <div><img class='flagImg' src="${country.flags.svg}" alt="флаг страны" /></div>
                <p><span class="name-official">${country.name.official}</span></p>
                </li>`;
              }
            });
          };
          countryList.innerHTML = htmlEl(arrCountrys).join('');
        }
      })
      .catch(error => {
        countryList.innerHTML = '';
        Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
      });
  } else {
    countryList.innerHTML = '';
  }
}
