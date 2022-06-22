module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        38: "9.5rem",
        30: "7.5rem",
      },
      colors: {
        default: "#eff3f8",
      },
    },
  },
  plugins: [],
  important: true,
};
