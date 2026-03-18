"use client";

import { useEffect, useState } from "react";
import { themes, getTheme, setTheme, type Theme } from "@/lib/utils";

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("amber-gold");
  const [mounted, setMounted] = useState(false);
  const [selectorPosition, setSelectorPosition] = useState(0);

  const themeKeys = Object.keys(themes) as Theme[];

  useEffect(() => {
    setMounted(true);
    const theme = getTheme();
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    // Set initial selector position
    const index = themeKeys.indexOf(theme);
    setSelectorPosition(index);
  }, []);

  const handleThemeChange = (theme: Theme, index: number) => {
    setCurrentTheme(theme);
    setTheme(theme);
    setSelectorPosition(index);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Main Theme Selector - Top Center (SNEHA SAURABHA inspired) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="relative flex items-center gap-8 px-8 py-4 bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-200/50">
          {/* Moving Selector Circle (Cyan/Teal) */}
          <div
            className="absolute w-12 h-12 bg-cyan-400/30 border-2 border-cyan-500 rounded-full transition-all duration-500 ease-out"
            style={{
              left: `calc(2rem + ${selectorPosition * 4}rem)`,
              transform: "translateX(-50%) translateY(-50%)",
              top: "50%",
            }}
          />

          {/* Theme Dots */}
          {themeKeys.map((themeKey, index) => {
            const theme = themes[themeKey];
            const isActive = currentTheme === themeKey;

            return (
              <button
                key={themeKey}
                onClick={() => handleThemeChange(themeKey, index)}
                className="group relative z-10 transition-all duration-300 hover:scale-125 focus:outline-none"
                title={theme.name}
                aria-label={`Switch to ${theme.name} theme`}
              >
                {/* Colored Dot */}
                <div
                  className={`
                    w-6 h-6 rounded-full shadow-lg transition-all duration-300
                    ${isActive ? "scale-110 shadow-xl" : "hover:scale-110"}
                  `}
                  style={{
                    backgroundColor: theme.color,
                    boxShadow: isActive
                      ? `0 0 20px ${theme.color}40, 0 0 40px ${theme.color}20`
                      : undefined,
                  }}
                />

                {/* Hover Tooltip */}
                <div
                  className="absolute top-full mt-3 left-1/2 -translate-x-1/2 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                           pointer-events-none whitespace-nowrap"
                >
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-4 py-2 shadow-xl">
                    <div className="font-semibold text-sm">{theme.name}</div>
                    <div className="text-gray-400 text-[10px] mt-0.5">
                      {theme.description}
                    </div>
                    {/* Arrow */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-1px]">
                      <div className="border-[5px] border-transparent border-b-gray-900"></div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Label underneath */}
        <div className="text-center mt-2">
          <span className="text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            Click to switch themes
          </span>
        </div>
      </div>

      {/* Right Side Color Bar Indicator (SNEHA SAURABHA inspired) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col gap-3 bg-white/90 backdrop-blur-sm p-2 rounded-l-xl shadow-lg border-l-0 border border-gray-200/50">
          {themeKeys.map((themeKey, index) => {
            const theme = themes[themeKey];
            const isActive = currentTheme === themeKey;

            return (
              <button
                key={themeKey}
                onClick={() => handleThemeChange(themeKey, index)}
                className="group relative transition-all duration-300 hover:scale-110"
                title={theme.name}
                aria-label={`Switch to ${theme.name}`}
              >
                <div
                  className={`
                    w-1 h-12 rounded-l-full transition-all duration-300
                    ${isActive ? "w-2 shadow-lg" : "hover:w-1.5"}
                  `}
                  style={{
                    backgroundColor: theme.color,
                    boxShadow: isActive
                      ? `0 0 15px ${theme.color}60`
                      : undefined,
                  }}
                />

                {/* Mini tooltip on left */}
                <div
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200
                           pointer-events-none"
                >
                  <div className="bg-gray-900 text-white text-xs rounded-md px-3 py-1.5 shadow-xl whitespace-nowrap">
                    {theme.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Theme Name Display - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg border border-gray-200/50">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full shadow-md"
              style={{ backgroundColor: themes[currentTheme].color }}
            />
            <div>
              <div className="text-xs font-semibold text-gray-700">
                {themes[currentTheme].name}
              </div>
              <div className="text-[10px] text-gray-500">
                {themes[currentTheme].description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
