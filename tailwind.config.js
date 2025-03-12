/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        heading: {
          light: "#1a202c", // Dark gray in light mode
          dark: "#F5793B", // Light gray in dark mode
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#354A63", // Keeping your existing primary color
          50: "#EFF1F4",
          100: "#DFE3E9",
          200: "#BFC8D3",
          300: "#9FACBD",
          400: "#7F91A7",
          500: "#5F7591",
          600: "#4C5E74",
          700: "#354A63", // Your main primary color
          800: "#233141",
          900: "#121820",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#F5793B", // Adding a complementary color
          50: "#FEF9EE",
          100: "#FEF3DD",
          200: "#FCE7BB",
          300: "#FADB99",
          400: "#F8CF77",
          500: "#F7C254",
          600: "#F5B632",
          700: "#F5793B", // Secondary color
          800: "#C47F08",
          900: "#935F06",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "var(--tw-prose-body)",
            h1: {
              marginTop: "1.5em",
              marginBottom: "0.5em",
              color: "#F5793B", // Using your primary color
            },
            h2: {
              marginTop: "1.25em",
              marginBottom: "0.5em",
              color: "#F5793B", // Using your primary color
            },
            h3: {
              marginTop: "1em",
              marginBottom: "0.5em",
              color: "#354A63", // Using your primary color
            },
            p: {
              marginTop: "0.75em",
              marginBottom: "0.75em",
            },
            ul: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },
            li: {
              marginTop: "0.25em",
              marginBottom: "0.25em",
            },
            pre: {
              backgroundColor: "var(--tw-prose-pre-bg)",
              borderRadius: "0.375rem",
              padding: "0.75rem 1rem",
              overflowX: "auto",
            },
            code: {
              backgroundColor: "var(--tw-prose-pre-bg)",
              borderRadius: "0.25rem",
              padding: "0.125rem 0.25rem",
              fontSize: "0.875em",
            },
            a: {
              color: "#F59E0B", // Using secondary color for links
              "&:hover": {
                color: "#F5793B", // Darker shade for hover
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
