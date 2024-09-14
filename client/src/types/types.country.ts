import { z } from "zod";

export const borderingCountrySchema = z.object({
  commonName: z.string(),
  officialName: z.string(),
  countryCode: z.string(),
  region: z.string(),
  borders: z.any(),
});
export type BorderingCountry = z.infer<typeof borderingCountrySchema>;

const countryDetailsSchema = z.object({
  commonName: z.string(),
  officialName: z.string(),
  countryCode: z.string(),
  region: z.string(),
  borders: z.array(borderingCountrySchema),
});
export type CountryDetails = z.infer<typeof countryDetailsSchema>;

export const countryInfoSchema = z.object({
  countryCode: z.string(),
  name: z.string(),
});
export type CountryInfo = z.infer<typeof countryInfoSchema>;

export const populationCountSchema = z.object({
  year: z.number(),
  value: z.number(),
});

const countryStatsSchema = z.object({
  country: z.string(),
  code: z.string(),
  iso3: z.string(),
  populationCounts: z.array(populationCountSchema),
});

const FlagInfoSchema = z.object({
  name: z.string(),
  iso2: z.string(),
  flag: z.string().url(),
});

// Generic Zod schema for CountriesNowApiData
const CountriesNowApiDataSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    error: z.boolean(),
    msg: z.string(),
    data: z.array(dataSchema),
  });

// CountriesPopulationData using Zod
export const CountriesPopulationDataSchema =
  CountriesNowApiDataSchema(countryStatsSchema);

// CountriesFlagsData using Zod
export const CountriesFlagsDataSchema =
  CountriesNowApiDataSchema(FlagInfoSchema);

// Inferred Types from Zod schemas
export type CountriesPopulationData = z.infer<
  typeof CountriesPopulationDataSchema
>;
export type CountriesFlagsData = z.infer<typeof CountriesFlagsDataSchema>;
export type CountryStats = z.infer<typeof countryStatsSchema>;
export type PopulationCount = z.infer<typeof populationCountSchema>;
export type FlagInfo = z.infer<typeof FlagInfoSchema>;
