import { Globe } from "lucide-react";
import { ModeToggle } from "./DarkModeTrigger";
import Link from "next/link";
import { Input } from "./ui/input";

export const Header = () => {
  return (
    <header className="bg-secondary shadow-md fixed top-0 w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="div flex gap-2 items-center">
          <Link
            href="/"
            prefetch={true}
            className="text-2xl font-bold text-primary flex gap-2 py-2 px-3 rounded-md hover:bg-primary-foreground hover:bg-opacity-5 transition-all"
          >
            <Globe className="h-8 w-8" />
            Countries
          </Link>

          <Input placeholder="Search for a country" />
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};
