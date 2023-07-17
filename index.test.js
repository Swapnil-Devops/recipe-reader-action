const fs = require("fs");
const core = require("@actions/core");
const { main } = require("./index");

describe("index.js", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should set the JSON content as an output", () => {
    const mockGetInput = jest.spyOn(core, "getInput").mockImplementation();
    const mockReadFileSync = jest
      .spyOn(fs, "readFileSync")
      .mockImplementation();
    const mockSetOutput = jest.spyOn(core, "setOutput").mockImplementation();

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
    const mockGetInput = jest.spyOn(core, "getInput").mockImplementation();
    const mockSetFailed = jest.spyOn(core, "setFailed").mockImplementation();

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
