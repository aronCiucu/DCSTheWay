const { BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

class CrosshairWindow extends BrowserWindow {
  constructor() {
    super({
      width: 150,
      height: 150,
      transparent: true,
      resizable: false,
      frame: false,
    });

    this.setAlwaysOnTop(true);
    this.setMenu(null);
    this.setFocusable(false);
    this.setIgnoreMouseEvents(true);
    this.loadURL(
      isDev
        ? "http://localhost:3000/crosshair.html"
        : `file://${path.join(__dirname, "../build/crosshair.html")}`
    );
    // this.webContents.openDevTools({ mode: "detach" });
  }
}

module.exports = CrosshairWindow;
