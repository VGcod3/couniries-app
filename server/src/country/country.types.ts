export interface CountryDetails {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: BorderingCountry[];
}

export interface BorderingCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: any;
}

export type CountryInfo = {
  countryCode: string;
  name: string;
};

interface CountriesNowApiData<T> {
  error: boolean;
  msg: string;
  data: T[];
}

export type CountriesPopulationData = CountriesNowApiData<CountryStats>;

export type CountriesFlagsData = CountriesNowApiData<FlagInfo>;

export interface CountryStats {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCount[];
}
export interface PopulationCount {
  year: number;
  value: number;
}

export interface FlagInfo {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}
