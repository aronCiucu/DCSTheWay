const { ipcMain } = require("electron");
const CrosshairWindow = require("./CrosshairWindow");
class SelectionHandler {
  crosshairWindow;
  constructor() {
    ipcMain.on("f10Start", () => {
      this.f10SelectionStart();
    });
    ipcMain.on("f10Stop", () => {
      this.f10SelectionStop();
    });
  }

  f10SelectionStart() {
    this.crosshairWindow = new CrosshairWindow();
  }
  f10SelectionStop() {
    this.crosshairWindow.close();
  }
}

module.exports = SelectionHandler;
