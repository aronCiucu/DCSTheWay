const { ipcMain, dialog } = require("electron");
const CrosshairWindow = require("./CrosshairWindow");
const fs = require("fs");

class SelectionHandler {
  crosshairWindow;
  mainWindow;

  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    ipcMain.on("f10Start", () => {
      this.f10SelectionStart();
    });
    ipcMain.on("f10Stop", () => {
      this.f10SelectionStop();
    });
    ipcMain.on("saveFile", (event, msg) => {
      this.saveFile(msg);
    });
    ipcMain.on("openFile", () => {
      this.openFile();
    });
  }
  openFile() {
    dialog
      .showOpenDialog({
        filters: [{ name: "TheWay file", extensions: ["tw"] }],
      })
      .then(({ filePaths }) => {
        if (filePaths.length === 1) {
          try {
            const data = fs.readFileSync(filePaths[0], "utf8");
            const jsonData = JSON.parse(data);
            this.mainWindow.webContents.send("fileOpened", jsonData);
          } catch {}
        }
      });
  }

  saveFile(commands) {
    dialog
      .showSaveDialog({
        title: "Save waypoints in a file",
        defaultPath: "waypoints.tw",
        filters: [{ name: "TheWay file", extensions: ["tw"] }],
      })
      .then(({ filePath }) => {
        fs.writeFileSync(filePath, commands, "utf-8");
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
