const fs = require("fs");
const path = require("path");

const sketches_path = path.join("src", "sketches");

/**
 * Construct a filter predicate which removes all path elements
 * which are not directories.
 *
 * Paths are constructed relative to a provided root path.
 */
function is_directory(root) {
  return (file) => {
    const full_path = path.join(root, file);
    const stat = fs.lstatSync(full_path);
    if (stat.isDirectory()) {
      return true;
    } else {
      console.warn(`skipping {file} because it is not a directory`);
      return false;
    }
  };
}

module.exports = async () => {
  const sketches_root = path.join(__dirname, "../../", sketches_path);

  /**
   * Categories are all of the root-level folders in the sketches directory.
   */
  const categories = fs
    .readdirSync(sketches_root)
    .filter(is_directory(sketches_root));

  /**
   * Each category can have 0 or more sketches.
   */
  const sketches = categories.flatMap((category_folder) => {
    const category_path = path.join(sketches_root, category_folder);
    const sketch_folders = fs
      .readdirSync(category_path)
      .filter(is_directory(category_path));

    const sketches_in_category = sketch_folders.map((sketch_folder) => {
      const sketch_path = path.join(category_path, sketch_folder);
      const sketch_files = fs.readdirSync(sketch_path);
      const source = sketch_files.find((file) => file == "index.ts");
      const screenshot = sketch_files.find((file) => {
        const ext = path.extname(file);
        return ext == ".jpg" || ext == ".png";
      });

      if (source == undefined) {
        console.warn("Unable to find index.ts for", sketch_folder);
      }

      const full_sketch_folder_path = path.join(
        "~",
        sketches_path,
        category_folder,
        sketch_folder
      );
      return {
        name: sketch_folder,
        category: category_folder,
        source: path.join(full_sketch_folder_path, source),
        screenshot:
          screenshot == undefined
            ? undefined
            : path.join(full_sketch_folder_path, screenshot),
      };
    });
    return sketches_in_category;
  });

  console.log("found sketches ", JSON.stringify(sketches, undefined, 2));

  return sketches;
};
