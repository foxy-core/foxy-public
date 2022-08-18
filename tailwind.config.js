const typography = require('@tailwindcss/typography')

module.exports = {
  content: ['src/**/*.{vue,ts,js}'],
  theme: {
    extend: {
      screens: {
        'media-hover': {
          raw: '(hover: hover)',
        },
      },
    },
  },
  plugins: [typography()],
}
