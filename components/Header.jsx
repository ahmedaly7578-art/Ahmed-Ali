import Image from "next/image";
import Link from "next/link";

import Socials from "../components/Socials";
import ThemeToggle from "../components/ThemeToggle";

const Header = () => {
  return (
    <header className="absolute z-30 w-full items-center px-16 xl-px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
          {/* logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Ahmed Ali"
              className="site-logo"
              width={220}
              height={48}
              priority
            />
          </Link>

          {/* socials */}
          <div className="flex items-center gap-x-5">
            <Socials />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
