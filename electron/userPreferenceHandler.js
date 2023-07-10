const { ipcMain } = require("electron");
const Store = require('electron-store');

class userPreferenceHandler {
    mainWindow;

    constructor(mainWindow) {
        this.mainWindow = mainWindow;
        ipcMain.on("savePreferences", (e, data) => {
            console.log('allah');
            this.#writePreferencesFile(data);
        });
    }

    #writePreferencesFile(data) {
        const store = new Store();
        store.set(data);
    }
}

module.exports = userPreferenceHandler;