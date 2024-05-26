/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#423F71",
        header: "#292841",
        body: "#191921",
      },
      screens: {
        mobile: {
          max: "768px",
        },
      },
      transitionProperty: {
        margin: "margin",
        opacity: "opacity",
        transform: "transform",
      },

      keyframes: {
        dropdown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },

        dropleft: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        dropdown: 'dropdown 0.3s ease-out',
        dropleft: 'dropleft 0.3s ease-in',
      },
    
    },
  },
  plugins: [tailwindScrollbar],
};
