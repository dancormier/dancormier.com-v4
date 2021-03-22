module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        scroll: 'scroll 80s infinite linear',
        wave: 'wave 3s infinite cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        scroll: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(15deg)' },
        },
      },
    },
    fontFamily: {
      display:
        'Fredoka One,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
      sans:
        'Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
    },
  },
  variants: {
    extend: {},
    display: ['group-hover', 'group-focus'],
  },
  plugins: [],
}
