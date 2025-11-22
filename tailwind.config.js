/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#39A3FF',      // Primary Color
        secondary: '#B0D4F2',    // Secondary Color  
        background: '#FFF4E9',   // Background Color
        highlight: '#FF9149',    // Highlight Color
        textDark: '#666666',     // Text Color
        textLight: '#999999',
        white: '#FFFFFF',
        success: '#4CAF50',
        error: '#F44336',
      },
    },
  },
  plugins: [],
}

