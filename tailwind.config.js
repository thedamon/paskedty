module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./index.html",
      "./src/**/*.vue",
      "./src/**/*.js",
      // etc.
    ],
  },
  corePlugins: {
    // preflight: false,
  },
  theme: {},
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
