"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Header() {
  const [theme, setTheme] = useLocalStorage<"dark" | "light" | null>("theme", null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = theme === "dark" || (theme === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const currentlyDark = document.documentElement.classList.contains("dark");
    setTheme(currentlyDark ? "light" : "dark");
  };

  const isDarkMode = mounted ? document.documentElement.classList.contains("dark") : true;

  return (
    <div className="w-full flex justify-between items-center mb-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
        longermini
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        <a
          href="https://github.com/lkjsxc/longermini"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-gray-100 font-bold"
          aria-label="GitHub Repository"
        >
          GH
        </a>
      </div>
    </div>
  );
}
