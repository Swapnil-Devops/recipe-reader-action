const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
// const Ajv = require("ajv");
// const ajv = new Ajv();

try {
  // Read the JSON file path from the input
  const jsonFilePath = core.getInput("json-file");

  // Read the JSON file content
  const jsonContent = fs.readFileSync(jsonFilePath, "utf8");

  // Read the schema file path from the input
  // const schemaFilePath = core.getInput("schema-file");

  // Read the schema file content
  // const schemaContent = fs.readFileSync(schemaFilePath, "utf8");
  // const validate = ajv.compile(schemaContent);
  // const valid = validate(jsonContent);
  // if (!valid) console.log(validate.errors);

  // Perform validation using your chosen JSON schema library
  // Replace this section with your own validation logic

  // Log the JSON content
  // console.log("JSON Content:", jsonContent);

  // Set the JSON content as an output
  core.setOutput("json", jsonContent);
} catch (error) {
  core.setFailed(`Action failed with error: ${error}`);
}
