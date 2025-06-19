import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { Country, Option } from "../types/common";
export const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
export const countryCodes: Country[] = getCountries().map((code) => ({
  code,
  dialingCode: `+${getCountryCallingCode(code)}`,
}));
export const countryCodeList: Option[] = getCountries().map((code) => ({
  id: code,
  name: `+${getCountryCallingCode(code)}`,
  image: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
}));

export const countries: Option[] = getCountries().map((code) => ({
  id: code,
  name: regionNames.of(code.toUpperCase()) ?? code,
  image: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
}));
