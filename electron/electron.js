const path = require("path");
const {app} = require("electron");
const isDev = require("electron-is-dev");
const UDPListener = require("./UDPListener.js");
const UDPSender = require("./TCPSender");
const SelectionHandler = require("./SelectionHandler.js");
const UserPreferenceHandler = require("./userPreferenceHandler");
const MainWindow = require("./MainWindow.js");
const {uIOhook, UiohookKey} = require("uiohook-napi");
const { default: installExtension, REDUX_DEVTOOLS} = require('electron-devtools-installer');

let mainWindow;
let udpListener;
let selectionHandler;
let udpSender;
let userPreferenceHandler;

async function createWindow() {
    mainWindow = new MainWindow();
    if (isDev) {
        const options = {
            loadExtensionOptions: { allowFileAccess: true },
        };
        await installExtension(
            REDUX_DEVTOOLS,
            options
        );
        mainWindow.webContents.openDevTools({mode: "detach"});
    }
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
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
        selectionHandler = new SelectionHandler(mainWindow);
        udpSender = new UDPSender();
        userPreferenceHandler = new UserPreferenceHandler(mainWindow);

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

}

