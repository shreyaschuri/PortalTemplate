const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6366f1", // Indigo
          accent: "#22d3ee",  // Cyan
          glow: "#a855f7",    // Purple
        },
      },
    },
  },
  plugins: [nextui()],
};
