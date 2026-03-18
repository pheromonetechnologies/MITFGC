import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Available color themes
 */
export const themes = {
  "amber-gold": {
    name: "Amber Gold",
    description: "Warm & Professional",
    color: "#d4a02f",
  },
  "academic-blue": {
    name: "Academic Blue",
    description: "Traditional & Trustworthy",
    color: "#1e3a8a",
  },
  "modern-purple": {
    name: "Modern Purple",
    description: "Fresh & Contemporary",
    color: "#7c3aed",
  },
  "earthy-burgundy": {
    name: "Earthy Burgundy",
    description: "Sophisticated & Warm",
    color: "#991b1b",
  },
} as const;

export type Theme = keyof typeof themes;

/**
 * Get current theme from localStorage or default
 */
export function getTheme(): Theme {
  if (typeof window === "undefined") return "amber-gold";
  return (localStorage.getItem("theme") as Theme) || "amber-gold";
}

/**
 * Set theme in localStorage and apply to document
 */
export function setTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}
