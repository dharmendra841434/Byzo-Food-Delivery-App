/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f8cb46',
        secondry: '#318616',
        background: 'white',
        blackText: '#1f1f1f',
      },
    },
  },
  plugins: [],
};
