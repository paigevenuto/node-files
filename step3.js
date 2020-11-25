const process = require("process");
const fs = require("fs");
const axios = require("axios");

let arg1 = process.argv[2];
let input;
let outPath;

function cat(filePath) {
  try {
    let text = fs.readFileSync(filePath, "utf8");
    stdOut(text);
  } catch {
    console.error(`ERROR: ${filePath} does not exist!`);
    process.exit(1);
  }
}

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    stdOut(resp.data);
  } catch (err) {
    console.error(`Failed to get ${url}\n${err}`);
    process.exit(1);
  }
}

function stdOut(data) {
  if (outPath) {
    fs.writeFile(outPath, data, "utf8", (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

input = arg1 == "--out" ? process.argv[3] : arg1;
if (arg1 == "--out") outPath = process.argv[4];

if (input.includes("http://") || input.includes("https://")) {
  webCat(input);
} else {
  cat(input);
}
