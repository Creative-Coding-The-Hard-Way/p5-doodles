module.exports = function (config) {
  config.addPassthroughCopy("site/manifest/*");
  config.addPassthroughCopy("site/**/*.css");

  return {
    dir: {
      input: "site",
      output: "e11ty_dist",
    },
  };
};
