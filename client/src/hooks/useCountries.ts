import { useQuery } from "@tanstack/react-query";
import {
  borderingCountrySchema,
  countryInfoSchema,
  populationCountSchema,
} from "../types/types.country";

const BASE_URL = "http://localhost:5000/country";

export const useAvailableCountries = () => {
  const url = `${BASE_URL}/available`;

  const { data, error, isPending } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      fetch(url)
        .then((res) => res.json())
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((data) => countryInfoSchema.array().parse(data)),
  });

  return { data, error, isPending };
};

export const useFlagURL = (countryCode: string) => {
  const url = `${BASE_URL}/info/flagURL/${countryCode}`;

  const { data, error, isPending } = useQuery({
    queryKey: ["flag", countryCode],
    queryFn: async () =>
      fetch(url)
        .then((res) => res.json())
        .then((res) => res.data)
        .catch(() => {
          console.error("Unable to fetch flag info!");
          throw new Error("Unable to fetch flag info!");
        }),
  });

  return { data, error, isPending };
};

export const useBorderInfo = (countryCode: string) => {
  const url = `${BASE_URL}/info/border/${countryCode}`;

  const { data, error, isPending } = useQuery({
    queryKey: ["border", countryCode],
    queryFn: () =>
      fetch(url)
        .then((res) => res.json())
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((data) => borderingCountrySchema.array().parse(data)),
  });

  return { data, error, isPending };
};

export const useCountryDetails = (countryCode: string) => {
  const url = `${BASE_URL}/info/${countryCode}`;

  const { data, error, isPending } = useQuery({
    queryKey: ["country", countryCode],
    queryFn: () =>
      fetch(url)
        .then((res) => res.json())
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((res) => borderingCountrySchema.parse(res)),
  });

  return { data, error, isPending };
};

export const usePopulationInfo = (countryName: string) => {
  const url = `${BASE_URL}/info/population/${countryName}`;

  const { data, error, isPending } = useQuery({
    queryKey: ["population", countryName],
    queryFn: () =>
      fetch(url)
        .then((res) => res.json())
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((res) => populationCountSchema.array().parse(res)),
  });

  return { data, error, isPending };
};
