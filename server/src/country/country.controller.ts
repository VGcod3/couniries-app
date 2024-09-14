import { Controller, Get, Param } from "@nestjs/common";
import { CountryService } from "./country.service";

@Controller("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get("available")
  async getAvailableCountries() {
    return this.countryService.getAvailableCountries();
  }

  @Get("info/border/:countryCode")
  async getBorderInfo(@Param("countryCode") countryCode: string) {
    return this.countryService.getBorderInfo(countryCode);
  }
  @Get("info/population/:countryName")
  async getPopulationInfo(@Param("countryName") countryName: string) {
    return this.countryService.getPopulationInfo(countryName);
  }
  @Get("info/flagURL/:countryCode")
  async getFlagURL(@Param("countryCode") countryCode: string) {
    return this.countryService.getFlagURL(countryCode);
  }

  @Get("info/:countryCode")
  async getCountryNameByCode(@Param("countryCode") countryCode: string) {
    return this.countryService.getCountryDetails(countryCode);
  }
}
