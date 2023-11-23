import saveModulePreferences from "./savePreferences";

const { ipcRenderer } = require("electron");

jest.mock(
  "electron",
  () => {
    return { ipcRenderer: { send: jest.fn() } };
  },
  { virtual: true },
);

describe.skip("saveUserPreferences", () => {
  it("should send data to electron", () => {
    saveModulePreferences({ hideDialogs: true });
    expect(ipcRenderer.send).toBeCalledWith("savePreferences", {
      hideDialogs: true,
    });
    saveModulePreferences({ hideDialogs: false });
    expect(ipcRenderer.send).toBeCalledWith("savePreferences", {
      hideDialogs: false,
    });
  });
});
