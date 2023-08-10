const { BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

class CrosshairWindow extends BrowserWindow {
  constructor() {
    super({
      width: 30,
      height: 30,
      transparent: true,
      resizable: false,
      frame: false,
      focusable: false,
    });

    this.setMenu(null);
    this.setIgnoreMouseEvents(true);
    this.setAlwaysOnTop(true, "normal");
    this.loadURL(
      isDev
        ? "http://localhost:3000/crosshair.html"
        : `file://${path.join(__dirname, "../build/crosshair.html")}`
    );
    // this.webContents.openDevTools({ mode: "detach" });
  }
}

module.exports = CrosshairWindow;
