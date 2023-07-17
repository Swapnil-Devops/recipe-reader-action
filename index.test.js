const fs = require("fs");
const {main}  = require("./index");
const core = require("@actions/core");

// jest.mock("fs");
// jest.mock("@actions/core");

describe("index.js", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should set the JSON content as an output", () => {
    
    const mockGetInput = jest.spyOn(core, "getInput");
    const mockReadFileSync = jest.spyOn(fs, "readFileSync");
    const mockSetOutput = jest.spyOn(core, "setOutput");

    const jsonFilePath = "example.json";
    const jsonContent = '{"name": "John Doe"}';

    mockGetInput.mockReturnValueOnce(jsonFilePath);
    mockReadFileSync.mockReturnValueOnce(jsonContent);
    
    main(core);
    
    expect(mockGetInput).toHaveBeenCalledWith("json-file");
    expect(mockReadFileSync).toHaveBeenCalledWith(jsonFilePath, "utf8");
    expect(mockSetOutput).toHaveBeenCalledWith("json", jsonContent);
  });

  test("should set the failure message on error", () => {
    
    const mockGetInput = jest.spyOn(core, "getInput");
    const mockSetFailed = jest.spyOn(core, "setFailed");

    const jsonFilePath = "example.json";
    const error = new Error("no such file or directory");

    mockGetInput.mockReturnValueOnce(jsonFilePath);
    fs.readFileSync.mockImplementationOnce(() => {
      throw error;
    });
    
    main(core);
    
    expect(mockGetInput).toHaveBeenCalledWith("json-file");
    expect(mockSetFailed).toHaveBeenCalledTimes(1);
    expect(mockSetFailed).toHaveBeenCalledWith(
      `Action failed with error: ${error}`
    );
  });
});
