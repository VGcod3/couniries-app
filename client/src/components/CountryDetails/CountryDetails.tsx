"use client";
import { useCountryDetails, useFlagURL } from "@/hooks/useCountries";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

import { BorderingCountries } from "./BorderingCountries";
import { useCountryCode } from "@/hooks/useCountryCode";

export const CountryDetails = () => {
  const countryCode = useCountryCode();
  const { data, error, isPending } = useCountryDetails(countryCode);
  const {
    data: flagLink,
    error: flagError,
    isPending: flagLoading,
  } = useFlagURL(countryCode);

  return (
    <div className="col-span-1">
      {isPending && <DetailsSkeleton />}
      {error && error?.message}
      {data && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl opacity-80 mb-1">{data.officialName}</h2>
          <Flag
            flagLink={flagLink}
            flagError={flagError}
            flagLoading={flagLoading}
          />
          <p className="flex gap-1">
            <span className="font-bold opacity-80"> Region:</span>
            <Link className="underline" href="/">
              {data.region}
            </Link>
          </p>
        </div>
      )}
      <BorderingCountries />
    </div>
  );
};

const DetailsSkeleton = () => {
  return (
    <div className="col-span-1 flex flex-col gap-2">
      <Skeleton className="h-9 rounded-md w-48" />
      <Skeleton className="h-60 rounded-lg w-96" />
      <Skeleton className="h-7 rounded-md w-32" />
    </div>
  );
};

export const CountryName = () => {
  const countryCode = useCountryCode();
  const { data, error, isPending } = useCountryDetails(countryCode);
  return (
    <>
      {isPending && <Skeleton className="h-9 rounded-md w-36" />}
      {error && error?.message}
      {data && <h1 className="text-3xl font-bold">{data.commonName}</h1>}
    </>
  );
};

const Flag = ({
  flagLink,
  flagError,
  flagLoading,
}: {
  flagLink: string | undefined;
  flagError: Error | null;
  flagLoading: boolean;
}) => {
  return (
    <>
      {flagLoading && <Skeleton className="h-60 rounded-lg w-96" />}
      {flagError && (
        <div className="w-96 h-60 rounded-md border-2 border-dashed border-destructive p-3 text-xl text-red-600">
          Unable to fetch flag!
        </div>
      )}
      {flagLink && (
        <Image
          width={384}
          height={240}
          className="rounded-lg w-96 h-60 border object-cover"
          src={flagLink}
          alt="flag"
        />
      )}
    </>
  );
};
