const core = require('@actions/core');
const fs = require('fs');
const Ajv = require('ajv');

try {
  // Read the JSON file path and schema file path from the inputs
  const jsonFilePath = core.getInput('json-file');
  const schemaFilePath = core.getInput('schema-file');

  // Read the JSON file content
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');

  // Parse the JSON content into an object
  const data = JSON.parse(jsonContent);

  // Read the schema file content
  const schemaContent = fs.readFileSync(schemaFilePath, 'utf8');

  // Parse the schema content into a schema object
  const schema = JSON.parse(schemaContent);

  // Validate the JSON data against the schema
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  if (!isValid) {
    // If validation fails, retrieve the validation errors
    const errors = validate.errors.map(error => error.message);
    core.setOutput('errors', JSON.stringify(errors));
    core.setFailed(`JSON validation failed:\n${errors.join('\n')}`);
  } else {
    // If validation succeeds, set the JSON data as the output
    core.setOutput('json', jsonContent);
  }
} catch (error) {
  core.setFailed(`Action failed with error: ${error}`);
}
