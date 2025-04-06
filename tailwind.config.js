// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        "brand-pink": "#FF6363", // Example color extracted from your image's text
        "brand-secondary": "#FF8F8F", // Lighter shade
        "brand-bg-light": "#FFF8F8", // Very light background tint
      },
      fontFamily: {
        // Add custom fonts if you have them
        sans: ["Inter", "sans-serif"], // Example using Inter
      },
      animation: {
        // Add the float animation here
        float: "float 6s ease-in-out infinite", // Make it slower
      },
      keyframes: {
        // Define the keyframes
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" }, // Increase float distance
        },
      },
    },
  },
  plugins: [],
};
