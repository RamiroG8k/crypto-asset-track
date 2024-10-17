/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--color-background) / <alpha-value>)',
        content: 'hsl(var(--color-content) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)'
        }
      }
    },
  },
  plugins: [],
}

