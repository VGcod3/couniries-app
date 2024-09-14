import { z } from "zod";
import { usePathname } from "next/navigation";

export const useCountryCode = () => {
  const pathname = usePathname();
  const countryCode = pathname.split("/").pop();
  return z.string().parse(countryCode);
};
