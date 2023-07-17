const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
async function main(_core, _github) {
  try {
    // Read the JSON file path from the input
    const jsonFilePath = _core.getInput("json-file");

    // Read the JSON file content
    const jsonContent = fs.readFileSync(jsonFilePath, "utf8");

    // Set the JSON content as an output
    _core.setOutput("json", jsonContent);
  } catch (error) {
    _core.setFailed(`Action failed with error: ${error}`);
  }
}

main(core, github);
module.exports = { main };