const path = require("path");
const { app, session } = require("electron");
const isDev = require("electron-is-dev");
const UDPListener = require("./UDPListener.js");
const UDPSender = require("./TCPSender");
const SelectionHandler = require("./SelectionHandler.js");
const MainWindow = require("./MainWindow.js");

let mainWindow;
/* eslint-disable no-unused-vars*/
let udpListener;
let selectionHandler;
let udpSender;

function createWindow() {
  mainWindow = new MainWindow();
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => app.quit());
  //Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
    session.defaultSession.loadExtension(
      "C:\\Users\\ardro\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.27.2_0"
    );
    session.defaultSession.loadExtension(
      "C:\\Users\\ardro\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\3.0.19_0"
    );
  }
}

app.whenReady().then(() => {
  createWindow();
  udpListener = new UDPListener(mainWindow);
  selectionHandler = new SelectionHandler(mainWindow);
  udpSender = new UDPSender();
});

app.on("window-all-closed", () => app.quit());
