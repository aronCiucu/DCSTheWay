import saveUserPreferences from "./saveUserPreferences";

const {ipcRenderer} = require("electron");

jest.mock("electron", () => {
    return {ipcRenderer: {send: jest.fn()}};
}, {virtual: true});

describe("saveUserPreferences", () => {
    it("should send data to electron", () => {
        saveUserPreferences({hideDialogs: true});
        expect(ipcRenderer.send).toBeCalledWith("savePreferences", {hideDialogs: true});
        saveUserPreferences({hideDialogs: false});
        expect(ipcRenderer.send).toBeCalledWith("savePreferences", {hideDialogs: false});
    });
});