const { ipcMain } = require("electron");
const CrosshairWindow = require("./CrosshairWindow");
class SelectionHandler {
  constructor() {
    ipcMain.on("f10Start", () => {
      this.f10Selection();
    });
  }

  f10Selection() {
    let crosshairWindow = new CrosshairWindow();
  }
}

module.exports = SelectionHandler;
