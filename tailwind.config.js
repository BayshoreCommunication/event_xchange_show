const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* ---------- PRIMARY COLORS & GRADIENTS ---------- */
      colors: {
        primary: {
          DEFAULT: "#02F6F8",
          start: "#02F6F8",
          end: "#0085F8",
          cyan: "#02F6F8",
          blue: "#0085F8",
        },
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #02F6F8 0%, #0085F8 100%)",
        "primary-gradient-to-r": "linear-gradient(90deg, #02F6F8 0%, #0085F8 100%)",
        "primary-gradient-to-b": "linear-gradient(180deg, #02F6F8 0%, #0085F8 100%)",
      },

      /* ---------- TYPOGRAPHY ---------- */
      fontFamily: {
        sans: ["var(--font-switzer)", "Switzer", "sans-serif"],
        switzer: ["var(--font-switzer)", "Switzer", "sans-serif"],
      },

      /* ---------- CONTAINER ---------- */
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1640px",
        },
      },

      /* ---------- MARQUEE ANIMATION ---------- */
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#02F6F8",
              foreground: "#000000",
            },
            background: "#FFFFFF",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#02F6F8",
              foreground: "#000000",
            },
            background: "#000000",
          },
        },
      },
    }),
  ],
};
