import { default as countries } from '../data/countries.json';
import { default as provinces } from '../data/vietnam-province-district.json';

export const country = countries.map((country) => {
  return country.name;
});

export const provinceData = Object.values(provinces);
export const provinceCountries = provinceData.map((province) => {
  return province.name;
});

export const object: string[] = [
  'Expert',
  'Vietnamese',
  'National Student',
  'Other',
];

export const gender: string[] = ['Female', 'Male', 'Other'];
