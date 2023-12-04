const path = require("path");
const { app, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const UDPListener = require("./UDPListener.js");
const UDPSender = require("./TCPSender");
const UserPreferenceHandler = require("./userPreferenceHandler");
const MainWindow = require("./MainWindow.js");
const {
  default: installExtension,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");
const CrosshairWindow = require("./CrosshairWindow");
const FileHandler = require("./fileHandler");
const setupKeybinds = require("./keybindListener");

let mainWindow;
let crosshairWindow;
let udpListener;
let fileHandler;
let udpSender;
let userPreferenceHandler;

async function createWindow() {
  mainWindow = new MainWindow();
  if (isDev) {
    const options = {
      loadExtensionOptions: { allowFileAccess: true },
    };
    await installExtension(REDUX_DEVTOOLS, options);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`,
  );

  mainWindow.on("closed", () => app.quit());
}

const isTheOnlyInstance = app.requestSingleInstanceLock();
if (!isTheOnlyInstance) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    createWindow();
    udpListener = new UDPListener(mainWindow);
    fileHandler = new FileHandler(mainWindow);
    udpSender = new UDPSender();
    userPreferenceHandler = new UserPreferenceHandler(
      mainWindow,
      applyElectronPreferences,
    );
    ipcMain.on("f10Start", () => {
      crosshairWindow = new CrosshairWindow();
    });
    ipcMain.on("f10Stop", () => {
      if (crosshairWindow) crosshairWindow.close();
      crosshairWindow = null;
    });
    function applyElectronPreferences(preferences) {
      const alwaysOnTop = preferences["alwaysOnTop"];
      const crosshairColor = preferences["crosshairColor"];
      setupKeybinds(mainWindow, preferences);
      if (alwaysOnTop === false)
        mainWindow.setAlwaysOnTop(false, "screen-saver");
      if (crosshairColor && crosshairWindow)
        crosshairWindow.webContents.send("crosshairColor", crosshairColor);
    }
  });

  app.on("window-all-closed", () => app.quit());
}
