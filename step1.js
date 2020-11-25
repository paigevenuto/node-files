const process = require("process");
const fs = require("fs");
const axios = require("axios");

let filePath = process.argv[2];

function cat(filePath) {
  try {
    let text = fs.readFileSync(filePath, "utf8", function (err, data) {});
    console.log(text);
  } catch {
    console.error(`ERROR: ${filePath} does not exist!`);
    process.exit(1);
  }
}

cat(filePath);
