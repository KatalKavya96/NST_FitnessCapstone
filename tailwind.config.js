/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA', // blue-400
          dark: '#2563EB', // blue-600
        },
        secondary: {
          light: '#F472B6', // pink-400
          dark: '#DB2777', // pink-600
        },
        background: {
          light: '#FFFFFF',
          dark: '#111827', // gray-900
        },
        surface: {
          light: '#F3F4F6', // gray-100
          dark: '#1F2937', // gray-800
        },
        text: {
          light: '#111827', // gray-900
          dark: '#F9FAFB', // gray-50
        }
      },
    },
  },
  plugins: [],
}