/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#423F71',
        header: '#292841',
        body: '#1C1B29',
      },
      screens: {
        'mobile': {
          max: '768px'
        }
      },
      transitionProperty: {
        margin: 'margin',
        opacity: 'opacity',
        transform: 'transform'
      }
    },
  },
  plugins: [
    tailwindScrollbar,
  ],
}

