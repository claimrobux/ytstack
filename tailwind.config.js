/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'slide-in': 'slide-in 0.3s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
};