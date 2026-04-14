"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial preference
    const isDarkMode = document.documentElement.classList.contains("dark") || 
      (!document.documentElement.classList.contains("light") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    const t = setTimeout(() => {
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }, 0);

    return () => clearTimeout(t);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };

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
          {isDark ? "☀️" : "🌙"}
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