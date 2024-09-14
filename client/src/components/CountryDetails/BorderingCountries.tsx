"use client";
import { useBorderInfo, useFlagURL } from "@/hooks/useCountries";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

import type { BorderingCountry } from "../../types/types.country";
import Image from "next/image";
import { useCountryCode } from "@/hooks/useCountryCode";

export const BorderingCountries = () => {
  const countryCode = useCountryCode();
  const { data, error, isPending } = useBorderInfo(countryCode);
  return (
    <div>
      <Separator className="mt-6" />
      <h2 className="text-xl opacity-80 my-2">Bordering Countries</h2>

      {isPending && <BorderingSkeleton />}
      {error && error?.message}
      {data &&
        (data.length === 0 ? (
          "No bordering countries found!"
        ) : (
          <div className="gap-2 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap">
            {data.map((country) => (
              <BorderingCountry key={country.countryCode} country={country} />
            ))}
          </div>
        ))}
    </div>
  );
};

const BorderingCountry = ({ country }: { country: BorderingCountry }) => {
  const { data, error, isPending } = useFlagURL(country.countryCode);

  return (
    <Link
      href={`/country/${country.countryCode}`}
      className="h-48 md:h-32 col-span-1 flex flex-col justify-between p-1 transition-all"
    >
      {isPending && <Skeleton className="h-24 rounded-md" />}
      {error && "Unable to fetch flag!"}
      {data && (
        <Image
          height={80}
          width={160}
          src={data}
          alt={`${country.commonName} flag`}
          className="h-40 md:h-24 pr-16 md:p-0 w-full rounded-md object-cover border"
        />
      )}
      <p>{country.commonName}</p>
    </Link>
  );
};

const BorderingSkeleton = () => {
  return (
    <div className="gap-2 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap">
      <Skeleton className="h-32 rounded-md col-span-1" />
      <Skeleton className="h-32 rounded-md col-span-1" />
      <Skeleton className="h-32 rounded-md col-span-1" />
    </div>
  );
};
