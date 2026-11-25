import Link from "next/link";

import Socials from "../components/Socials";
import ThemeToggle from "../components/ThemeToggle";

const Header = () => {
  return (
    <header className="absolute z-30 w-full px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center gap-x-4 py-5 xl:py-7 pr-0 xl:pr-24">
          {/* logo */}
          <Link href="/" className="flex items-center gap-x-2.5 text-xl font-bold tracking-tight">
            <span className="block w-3.5 h-3.5 rounded-[3px] bg-accent" aria-hidden />
            Ahmed Ali
          </Link>

          {/* socials */}
          <div className="flex items-center gap-x-4">
            <Socials />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
