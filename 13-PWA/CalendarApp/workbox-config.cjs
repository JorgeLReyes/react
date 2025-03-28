module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{css,js,html}"],
  swDest: "dist/sw.js",
  // ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swSrc: "src/sw-template.cjs", // generateSW no funciona con esta propiedad
};
