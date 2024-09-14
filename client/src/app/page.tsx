"use client";
import { useAvailableCountries } from "../hooks/useCountries";
import Link from "next/link";

export default function Home() {
  const { isPending, error, data } = useAvailableCountries();

  const firstLettes = new Set<string>();
  data?.forEach((country) => {
    firstLettes.add(country.name[0]);
  });

  // split array by first letter of country name
  const countriesByLetter = Array.from(firstLettes).map((letter) => {
    return {
      letter,
      countries: data!.filter((country) => country.name[0] === letter),
    };
  });

  return (
    <div className="p-8">
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      {countriesByLetter.map((letter, i) => (
        <div key={i}>
          <h2 className="text-xl font-bold">{letter.letter}</h2>
          <ul>
            {letter.countries?.map((country) => (
              <Link
                key={country.countryCode}
                prefetch={true}
                href={`/country/${country.countryCode}`}
              >
                <li key={country.countryCode}>{country.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
