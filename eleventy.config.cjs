module.exports = function (config) {
  config.addCollection("categories", (collectionApi) => {
    const sketches = collectionApi.getAll().filter((entry) => {
      return entry.data.sketch != undefined;
    });
    const categories = sketches.map((sketch) => {
      return sketch.data.sketch.category;
    });
    const unique = [...new Set(categories)];
    console.log("Found categories: ", unique);
    return unique;
  });

  config.addCollection("sketches", (collectionApi) => {
    const sketches = collectionApi.getAll().filter((entry) => {
      return entry.data.sketch != undefined;
    });
    console.log("Add", sketches.length, "sketches to the sketches collection");
    return sketches;
  });

  return {
    dir: {
      input: "site",
      output: "e11ty_dist",
    },
  };
};
