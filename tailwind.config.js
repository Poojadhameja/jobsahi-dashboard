/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
          10: 'var(--color-primary-10)',
          30: 'var(--color-primary-30)',
          50: 'var(--color-primary-50)',
        },
        // Secondary colors
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          dark: 'var(--color-secondary-dark)',
          light: 'var(--color-secondary-light)',
        },
        // Gray colors
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          600: 'var(--color-gray-600)',
        },
        // Semantic colors
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        // Background colors
        'bg-primary': 'var(--color-bg-primary)',
        'bg-white': 'var(--color-bg-white)',
        'bg-muted': 'var(--color-bg-muted)',
        // Text colors
        'text-primary': 'var(--color-text-primary)',
        'text-muted': 'var(--color-text-muted)',
      },
    },
  },
  plugins: [],
}
