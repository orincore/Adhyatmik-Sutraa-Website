import type { Config } from "tailwindcss";
// Palette only, from a plain .mjs module — see brand-colors.mjs for why this
// cannot be the .ts site config.
import { activeBrandColors } from "./brand-config/brand-colors.mjs";

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        serif: ["var(--font-cormorant)", "var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: activeBrandColors as unknown as Record<string, string>,
        // Adhyatmik Sutraa re-skin: the storefront/admin markup uses the stock
        // teal/emerald/cyan utility classes from the original theme, so those
        // three scales are remapped onto the live site's purple / pink /
        // lavender palette (Elementor global colors) instead of editing every
        // class usage.
        teal: {
          50: "#faf5fa",
          100: "#f3e8f3",
          200: "#e5cfe4",
          300: "#d0a8ce",
          400: "#b077ae",
          500: "#935592",
          600: "#7B3F7A",
          700: "#663367",
          800: "#542b54",
          900: "#35093C",
          950: "#240429",
        },
        emerald: {
          50: "#fff0f5",
          100: "#ffe0eb",
          200: "#ffc2d8",
          300: "#ff94ba",
          400: "#fe6a9e",
          500: "#FD4380",
          600: "#e42a6c",
          700: "#c01b58",
          800: "#9d1749",
          900: "#82153f",
          950: "#4c0521",
        },
        cyan: {
          50: "#f5f5fb",
          100: "#ececf7",
          200: "#d9d8ef",
          300: "#bcbbe2",
          400: "#9a99d1",
          500: "#7675B9",
          600: "#605ea6",
          700: "#514f8c",
          800: "#454373",
          900: "#3b3a5f",
          950: "#26253d",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
