const { BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const electron = require("electron");

class CrosshairWindow extends BrowserWindow {
  constructor() {
    const windowEdgeSize = 30;
    const bounds = electron.screen.getPrimaryDisplay().bounds;
    const x = bounds.x + (bounds.width - windowEdgeSize) / 2;
    const y = bounds.y + (bounds.height - windowEdgeSize) / 2;
    super({
      x,
      y,
      width: windowEdgeSize,
      height: windowEdgeSize,
      transparent: true,
      resizable: false,
      frame: false,
      focusable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    this.setMenu(null);
    this.setIgnoreMouseEvents(true);
    this.setAlwaysOnTop(true, "normal");
    this.loadURL(
      isDev
        ? "http://localhost:3000/crosshair.html"
        : `file://${path.join(__dirname, "../build/crosshair.html")}`,
    );
    // this.webContents.openDevTools({ mode: "detach" });
  }
}

module.exports = CrosshairWindow;
