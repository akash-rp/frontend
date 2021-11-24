module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  darkMode: false,

  theme: {
    fontFamily: {
      open: ['"Open Sans"'],
      roboto: ["Roboto"],
    },

    extend: {
      lineHeight: {
        "12": "3rem",
      },
      textColor: {
        dimgray: "dimgray",
      },
    },
  },

  variants: {
    extend: {
      borderRadius: ["hover", "focus"],
      opacity: ["disabled"],
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
