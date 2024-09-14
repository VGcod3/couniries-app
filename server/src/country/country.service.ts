import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import {
  CountriesFlagsData,
  CountriesPopulationData,
  CountryDetails,
  CountryInfo,
} from "./country.types";

@Injectable()
export class CountryService {
  private readonly nagerApi = process.env.NAGER_API;
  private readonly countriesNowApi = process.env.COUNTRIES_NOW_API;

  public async getAvailableCountries() {
    const url = `${this.nagerApi}/AvailableCountries`;
    const errorMessage = "Unable to fetch countries!";

    return { data: await this.fetchData<CountryInfo[]>(url, errorMessage) };
  }

  public async getBorderInfo(countryCode: string) {
    const url = `${this.nagerApi}/CountryInfo/${countryCode}`;
    const errorMessage = "Unable to border info!";

    const borderInfo = await this.fetchData<CountryDetails>(url, errorMessage);

    return {
      data: borderInfo,
    };
  }

  public async getPopulationInfo(countryName: string) {
    const url = `${this.countriesNowApi}population`;
    const errorMessage = "Unable to fetch population info!";

    const populationInfo = await this.fetchData<CountriesPopulationData>(
      url,
      errorMessage,
    );

    const searched = populationInfo.data.find((c) => c.country === countryName);

    if (!searched) {
      throw new NotFoundException("Country not found!");
    }

    return {
      data: searched.populationCounts,
    };
  }

  public async getFlagURL(countryCode: string) {
    const url = `${this.countriesNowApi}flag/images`;
    const errorMessage = "Unable to fetch flag info!";

    const flagInfo = await this.fetchData<CountriesFlagsData>(
      url,
      errorMessage,
    );

    const searched = flagInfo.data.find((c) => c.iso2 === countryCode);

    if (!searched) {
      throw new NotFoundException("Country not found!");
    }

    return { data: searched.flag };
  }

  // Helper function to make GET requests
  private async fetchData<T>(url: string, errorMessage: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(url);
      if (response.status !== 200) {
        throw new HttpException(errorMessage, response.status);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      throw new HttpException(errorMessage, error.response?.status || 500);
    }
  }
}
