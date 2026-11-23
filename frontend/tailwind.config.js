/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        funngro: {
          navy: '#0B1528',
          'navy-light': '#14233C',
          'navy-border': '#1E3250',
          green: '#10B981',
          'green-light': '#34D399',
          'green-dark': '#059669',
          purple: '#6366F1',
          'purple-light': '#818CF8',
          amber: '#F59E0B',
          coral: '#F97316',
          cyan: '#06B6D4'
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(11, 21, 40, 0.05), 0 2px 6px -1px rgba(11, 21, 40, 0.03)',
        'card-hover': '0 20px 30px -10px rgba(11, 21, 40, 0.1), 0 8px 12px -4px rgba(11, 21, 40, 0.04)',
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-purple': '0 0 25px -5px rgba(99, 102, 241, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

