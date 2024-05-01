/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        sporty: {
          "primary": "#14b8a6",
          "text-primary": "#ffffff",
          "secondary": "#115e59",
          "accent": "#9d174d",
          "neutral": "#ffffff",
          "base-100": "#ffffff",
          "info": "#2dd4bf",
          "success": "#84cc16",
          "warning": "#f59e0b",
          "error": "#b91c1c",
          ".btn-primary": {
            "color": "#ffffff",
          },
        },
      },
    ],
  },
}

