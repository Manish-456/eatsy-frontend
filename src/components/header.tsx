import { Link } from "react-router-dom";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "./mode-toggle";
import MainNav from "./main-nav";

export function Header() {
  return (
    <div className="border-b-2 dark:border-b-orange-600/10 border-b-orange-500/40 py-6">
      <div className="flex justify-between container mx-auto items-center">
        <Link
          to={"/"}
          className="text-3xl font-serif font-bold tracking-tight text-orange-500"
        >
          Eatsy
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="md:hidden block">
          <MobileNav />
          </div>
            <div className="hidden md:block">
              <MainNav />
            </div>
        </div>
      </div>
    </div>
  );
}
