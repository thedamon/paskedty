module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./index.html",
      "./src/**/*.vue",
      "./src/**/*.js",
      // etc.
    ],
    options: {
      whitelist: [
        "text-green-600",
        "text-green-300",
        "text-orange-400",
        "text-orange-600",
        "text-orange-700",
        "text-red-500",
      ],
    },
  },
  corePlugins: {
    // preflight: false,
  },
  theme: {
    fontFamily: { display: ['"Gochi Hand"', "cursive"] },
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
