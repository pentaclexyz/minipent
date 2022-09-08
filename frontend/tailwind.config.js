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
        'color-request': '#ffcde5',
        'color-approved': '#02E0B9',
        'color-todo': '#4e3689',
        'color-doing': '#ffcde5',
        'color-done': '#02E0B9',
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
