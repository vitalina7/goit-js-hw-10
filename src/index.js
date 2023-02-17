import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;


const inputEl = document.querySelector('#search-box');
const list = document.querySelector('.country-list')
const info = document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(e => {
    const trimValue = inputEl.value.trim();
    clearHTML()
    if (trimValue !== "") {
        fetchCountries(trimValue).then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            }
            else if (data.length === 0) {
                Notiflix.Notify.info('Oops, there is no country with that name')
            }
            else if (data.length === 1) {
                renderOneCountry(data)
            }
            else if (data.length >= 2 && data.length <= 10) {
                renderList(data)
            }
        })
    }
}, DEBOUNCE_DELAY)
);

function renderList(countries) {
    const markup = countries.map(country => {
        return `<li>
      <img src="${country.flags.svg}" alt="" width="30" height="30">
     <p><b>Name:</b>${country.name.official}</p>
      <p><b>Capital:</b>${country.capital}</p>
      <p><b>Population:</b>${country.population}</p>
      <p><b>Languages:</b>${Object.values(country.languages)}</p>
    </li>`}).join('');
   list.innerHTML = markup;
}
function renderOneCountry(countries) {
    const markup = countries.map(country => {
        return `<li>
      <img src="${country.flags.svg}" alt="" width="30" height="30">
     <p><b>Name:</b>${country.name.official}</p>
      <p><b>Capital:</b>${country.capital}</p>
      <p><b>Population:</b>${country.population}</p>
      <p><b>Languages:</b>${Object.values(country.languages)}</p>
    </li>`}).join('');
       list.innerHTML = markup;
}

function clearHTML() {
    list.innerHTML = " ";
    info.innerHTML = " ";
}