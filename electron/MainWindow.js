const { BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");

class MainWindow extends BrowserWindow {
  constructor() {
    super({
      icon: path.join(__dirname, "../public/TheWayIcon.ico"),
      show: false,
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
      transparent:true,
      frame: false,
      focusable: false,
    });

    this.setMenu(null);
    const WM_INITMENU = 0x0116;
    this.hookWindowMessage(WM_INITMENU, () => {
      this.setEnabled(false);
      this.setEnabled(true);
    });
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
    this.on("ready-to-show", () => {
      this.show();
    });
  }
}

module.exports = MainWindow;
