module.exports = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'roboto': ['roboto', 'sans-serif'],
      'inter': ['inter', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
