const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
try {
  // Read the JSON file path from the input
  const jsonFilePath = core.getInput("json-file");

  // Read the JSON file content
  const jsonContent = fs.readFileSync(jsonFilePath, "utf8");

 // Set the JSON content as an output
  core.setOutput("json", jsonContent);
} catch (error) {
  core.setFailed(`Action failed with error: ${error}`);
}
