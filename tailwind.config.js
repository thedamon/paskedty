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
      ],
    },
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
