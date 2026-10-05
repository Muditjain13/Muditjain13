// Run: node build-assets.js  → writes the 10 animated SVGs into ./assets
const fs = require("fs"), path = require("path");
const gen = require("./svg-gen.js");
const dir = path.join(__dirname, "assets");
fs.mkdirSync(dir, { recursive: true });
for (const [file, svg] of Object.entries(gen.all())) {
  fs.writeFileSync(path.join(dir, file), svg);
  console.log("wrote assets/" + file);
}
