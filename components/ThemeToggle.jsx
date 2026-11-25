import { HiMoon, HiSun } from "react-icons/hi2";

import { useTheme } from "../lib/theme";

const ThemeToggle = () => {
  const [theme, toggle] = useTheme();
  const isLight = theme === "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
      className="theme-toggle flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/5 text-white hover:text-accent hover:border-accent transition-all duration-300"
    >
      {isLight ? <HiMoon aria-hidden /> : <HiSun aria-hidden />}
    </button>
  );
};

export default ThemeToggle;
