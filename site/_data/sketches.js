const fs = require("fs");
const path = require("path");

const sketches_path = path.join("src", "sketches");

module.exports = async () => {
  const files = fs.readdirSync(path.join(__dirname, "../../", sketches_path));

  const sketches = files.map((file) => {
    return {
      name: path.parse(file).name,
      path: path.join("~", sketches_path, file),
    };
  });

  console.log("FOUND sketches ", JSON.stringify(sketches, undefined, 2));

  return sketches;
};
