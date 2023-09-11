const { ipcMain } = require("electron");
const Store = require('electron-store');

class userPreferenceHandler {
    mainWindow;
    store;

    constructor(mainWindow) {
        this.store = new Store();
        this.mainWindow = mainWindow;
        ipcMain.on("savePreferences", (e, data) => {
            this.#writePreferencesFile(data);
        });
        ipcMain.on("getPreferences", () => {
            this.#readPreferencesFile();
        });
    }

    #writePreferencesFile(data) {
        const existingPreference = this.store.get(data.module);
        existingPreference
            ? this.store.set(data.module, [...existingPreference, data.option])
            : this.store.set(data.module, [data.option]);
    }
    #readPreferencesFile() {
        const preferences = this.store.get();
        this.mainWindow.webContents.send("preferencesReceived", preferences);
    }
}

module.exports = userPreferenceHandler;