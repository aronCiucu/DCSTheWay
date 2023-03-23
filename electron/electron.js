const path = require("path");
const { app, session } = require("electron");
const isDev = require("electron-is-dev");
const UDPListener = require("./UDPListener.js");
const SelectionHandler = require("./SelectionHandler.js");
const MainWindow = require("./MainWindow.js");

let mainWindow;
let udpListener;
let selectionHandler;

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
  selectionHandler = new SelectionHandler();
});

app.on("window-all-closed", () => app.quit());

// const { app, BrowserWindow, globalShortcut } = require("electron");
// const {
//   OverlayController,
//   OVERLAY_WINDOW_OPTS,
// } = require("electron-overlay-window");
//
// // https://github.com/electron/electron/issues/25153
// app.disableHardwareAcceleration();
//
// let window;
//
// const toggleMouseKey = "Ctrl + J";
// const toggleShowKey = "Ctrl + K";
//
// function createWindow() {
//   window = new BrowserWindow({
//     width: 400,
//     height: 300,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//     ...OVERLAY_WINDOW_OPTS,
//   });
//
//   window.loadURL(`data:text/html;charset=utf-8,
//     <head>
//       <title>overlay-demo</title>
//     </head>
//     <body style="padding: 0; margin: 0;">
//       <div style="position: absolute; width: 100%; height: 100%; border: 4px solid red; background: rgba(255,255,255,0.1); box-sizing: border-box; pointer-events: none;"></div>
//       <div style="padding-top: 50vh; text-align: center;">
//         <div style="padding: 16px; border-radius: 8px; background: rgb(255,255,255); border: 4px solid red; display: inline-block;">
//           <span>Overlay Window</span>
//           <span id="text1"></span>
//           <br><span><b>${toggleMouseKey}</b> to toggle setIgnoreMouseEvents</span>
//           <br><span><b>${toggleShowKey}</b> to "hide" overlay using CSS</span>
//         </div>
//       </div>
//       <script>
//         const electron = require('electron');
//         electron.ipcRenderer.on('focus-change', (e, state) => {
//           document.getElementById('text1').textContent = (state) ? ' (overlay is clickable) ' : 'clicks go through overlay'
//         });
//         electron.ipcRenderer.on('visibility-change', (e, state) => {
//           if (document.body.style.display) {
//             document.body.style.display = null
//           } else {
//             document.body.style.display = 'none'
//           }
//         });
//       </script>
//     </body>
//   `);
//
//   // NOTE: if you close Dev Tools overlay window will lose transparency
//   window.webContents.openDevTools({ mode: "detach", activate: false });
//
//   makeDemoInteractive();
//
//   OverlayController.attachByTitle(
//     window,
//     process.platform === "darwin" ? "Untitled" : "DCS.openbeta",
//     { hasTitleBarOnMac: true }
//   );
// }
//
// function makeDemoInteractive() {
//   let isInteractable = false;
//
//   function toggleOverlayState() {
//     if (isInteractable) {
//       isInteractable = false;
//       OverlayController.focusTarget();
//       window.webContents.send("focus-change", false);
//     } else {
//       isInteractable = true;
//       OverlayController.activateOverlay();
//       window.webContents.send("focus-change", true);
//     }
//   }
//
//   window.on("blur", () => {
//     isInteractable = false;
//     window.webContents.send("focus-change", false);
//   });
//
//   setTimeout(toggleOverlayState, 10000);
//   globalShortcut.register(toggleMouseKey, toggleOverlayState);
//
//   globalShortcut.register(toggleShowKey, () => {
//     window.webContents.send("visibility-change", false);
//   });
// }
//
// app.on("ready", () => {
//   setTimeout(
//     createWindow,
//     process.platform === "linux" ? 1000 : 0 // https://github.com/electron/electron/issues/16809
//   );
// });
