const path = require("path");
const { app, session } = require("electron");
const isDev = require("electron-is-dev");
const UDPListener = require("./UDPListener.js");
const UDPSender = require("./TCPSender");
const SelectionHandler = require("./SelectionHandler.js");
const MainWindow = require("./MainWindow.js");
const { uIOhook, UiohookKey } = require("uiohook-napi");

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
  if (isDev) {
    //Open the DevTools.
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

  //keybinds
  let shiftPressed = false;
  let ctrlPressed = false;
  uIOhook.on("keydown", (event) => {
    if (event.keycode === UiohookKey.Shift) {
      shiftPressed = true;
    } else if (event.keycode === UiohookKey.Ctrl) {
      ctrlPressed = true;
    } else if (event.keycode === UiohookKey.S && ctrlPressed && shiftPressed) {
      mainWindow.webContents.send("saveWaypoint");
    } else if (event.keycode === UiohookKey.T && ctrlPressed && shiftPressed) {
      mainWindow.webContents.send("transferWaypoints");
    } else if (event.keycode === UiohookKey.D && ctrlPressed && shiftPressed) {
      mainWindow.webContents.send("deleteWaypoints");
    }
  });

  uIOhook.on("keyup", (event) => {
    if (event.keycode === UiohookKey.Shift) {
      shiftPressed = false;
    } else if (event.keycode === UiohookKey.Ctrl) {
      ctrlPressed = false;
    }
  });
  uIOhook.start();
});

app.on("window-all-closed", () => app.quit());
