module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        'color-primary-700': '#02E0B9',
        'color-secondary-700': '#ffcde5',
        'color-tertiary-700': '#4e3689',
        'color-black': '#121b05',
        'text-primary': '#121b05',
        'text-secondary': '#ffcde5',
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
