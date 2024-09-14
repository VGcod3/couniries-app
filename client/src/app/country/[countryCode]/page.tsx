import { PopulationChart } from "@/components/PopulationChart";

import {
  CountryDetails,
  CountryName,
} from "@/components/CountryDetails/CountryDetails";

export default function Country() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 container mx-auto">
      <div className="col-span-full">
        <CountryName />
      </div>

      <CountryDetails />

      <div className="col-span-1">
        <PopulationChart />
      </div>
    </div>
  );
}
