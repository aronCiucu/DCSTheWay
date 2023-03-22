const { BrowserWindow, screen } = require("electron");
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
      // focusable: false,
    });

    this.setMenu(null);
    this.setAlwaysOnTop(true, "screen");
  }
}

module.exports = MainWindow;
