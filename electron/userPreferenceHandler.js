const { ipcMain } = require("electron");
const Store = require("electron-store");

class userPreferenceHandler {
  mainWindow;
  applyElectronPreferences;
  store;

  constructor(mainWindow, applyElectronPreferences) {
    this.store = new Store();
    this.mainWindow = mainWindow;
    this.applyElectronPreferences = applyElectronPreferences;
    ipcMain.on("saveModulePreferences", (e, data) => {
      this.#writeModulePreferencesFile(data);
    });
    ipcMain.on("saveSettingsPreferences", (e, data) => {
      this.#writeSettingsPreferencesFile(data);
    });
    ipcMain.on("getPreferences", () => {
      this.#readPreferencesFile();
    });
  }

  #writeModulePreferencesFile(data) {
    const existingPreference = this.store.get(data.module);
    existingPreference
      ? this.store.set(data.module, [...existingPreference, data.option])
      : this.store.set(data.module, [data.option]);
  }

  #writeSettingsPreferencesFile(data) {
    this.store.set(data.key, data.value);
    if (data.apply) this.applyElectronPreferences({ [data.key]: data.value });
  }

  #readPreferencesFile() {
    const preferences = this.store.get();
    this.applyElectronPreferences(preferences);
    this.mainWindow.webContents.send("preferencesReceived", preferences);
  }
}

module.exports = userPreferenceHandler;
