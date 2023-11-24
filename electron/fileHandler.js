const { ipcMain, dialog } = require("electron");
const fs = require("fs");

class FileHandler {
  mainWindow;

  constructor(mainWindow) {
    this.mainWindow = mainWindow;

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
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date();
    const filename = `waypoints${
      d.getDate() + "" + monthNames[d.getMonth()] + "" + d.getFullYear()
    }`;

    dialog
      .showSaveDialog({
        title: "Save waypoints in a file",
        defaultPath: `${filename}.tw`,
        filters: [{ name: "TheWay file", extensions: ["tw"] }],
      })
      .then(({ filePath }) => {
        fs.writeFileSync(filePath, commands, "utf-8");
      });
  }
}

module.exports = FileHandler;
