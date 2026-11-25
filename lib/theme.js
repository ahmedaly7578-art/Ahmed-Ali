import { useCallback, useEffect, useState } from "react";

const KEY = "theme";

export const readTheme = () => {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
};

// Returns [theme, toggle]. The saved choice lives in localStorage; default is dark.
export const useTheme = () => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(readTheme());
    const onChange = () => setTheme(readTheme());
    window.addEventListener("theme-change", onChange);
    return () => window.removeEventListener("theme-change", onChange);
  }, []);
  const toggle = useCallback(() => {
    const next = readTheme() === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
    window.dispatchEvent(new Event("theme-change"));
  }, []);
  return [theme, toggle];
};
