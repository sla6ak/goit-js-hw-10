export const fetchCountries = nameCountry => {
  return fetch(`https://restcountries.com/v3.1/name/${nameCountry}`).then(res => {
    return res.json();
  });
};
