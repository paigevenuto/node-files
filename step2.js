const process = require("process");
const fs = require("fs");
const axios = require("axios");

let arg1 = process.argv[2];

function cat(filePath) {
  try {
    let text = fs.readFileSync(filePath, "utf8", function (err, data) {});
    console.log(text);
  } catch {
    console.error(`ERROR: ${filePath} does not exist!`);
    process.exit(1);
  }
}

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.error(`Failed to get ${url}\n${err}`);
    process.exit(1);
  }
}

if (arg1.includes("http://") || arg1.includes("https://")) {
  webCat(arg1);
} else {
  cat(arg1);
}
