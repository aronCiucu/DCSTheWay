const { BrowserWindow, screen, ipcMain } = require("electron");

class MainWindow extends BrowserWindow {
  constructor() {
    super({
      width: 300,
      height: 500,
      x: 0,
      y: screen.getPrimaryDisplay().workAreaSize.height - 500,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      maximizable: false,
      resizable: false,
      frame: false,
      focusable: false,
    });

    this.setMenu(null);
    this.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    this.setAlwaysOnTop(true, "screen-saver");

    ipcMain.on("minimize", () => {
      this.setFocusable(true);
      this.minimize();
    });
    ipcMain.on("close", () => {
      this.close();
    });
    ipcMain.on("focus", () => {
      this.setFocusable(true);
    });
    ipcMain.on("defocus", () => {
      this.setFocusable(false);
    });
    this.on("restore", () => {
      this.setFocusable(false);
    });
  }
}

module.exports = MainWindow;
