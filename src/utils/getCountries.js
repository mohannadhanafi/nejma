import worldMapData from 'city-state-country';

const countriesList = worldMapData.getAllCountries().map((item) => item.name);
const countries = [...new Set(countriesList)];

export {
  countries,
};
