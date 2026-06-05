const path = require("path");
const {
  app,
  ipcMain,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  screen,
} = require("electron");
const isDev = require("electron-is-dev");
const Store = require("electron-store");

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
let unitImportWindow;
let udpListener;
let fileHandler;
let udpSender;
let userPreferenceHandler;

let restoreWindow;
let pillWindow;
let tray;

let suppressRestoreFocus = false;
let isQuitting = false;

const winStore = new Store({ name: "window-state" });

const ASSET_DIR = path.join(__dirname, "assets");
const ICON_ICO = path.join(ASSET_DIR, "TheWayIcon.ico");
const ICON_PNG = path.join(ASSET_DIR, "TheWayIcon.png");

function buildAppUrl(windowName) {
  const suffix = windowName ? `?window=${windowName}` : "";
  return isDev
    ? `http://localhost:3000${suffix}`
    : `file://${path.join(__dirname, "../build/index.html")}${suffix}`;
}

function getPrimaryWorkArea() {
  const wa = screen.getPrimaryDisplay().workArea;
  return { x: wa.x, y: wa.y, width: wa.width, height: wa.height };
}

function getPillBounds() {
  const wa = getPrimaryWorkArea();
  return { x: wa.x, y: wa.y + wa.height - 28, width: 28, height: 28 };
}

function showOverlayInactive() {
  if (!mainWindow || mainWindow.isDestroyed()) return;

  try {
    mainWindow.setFocusable(false);
  } catch {}

  try {
    if (mainWindow.isMinimized()) mainWindow.restore();
  } catch {}

  try {
    mainWindow.showInactive();
  } catch {
    try {
      mainWindow.show();
    } catch {}
  }

  try {
    mainWindow.setAlwaysOnTop(true, "screen-saver");
  } catch {}

  try {
    if (restoreWindow && !restoreWindow.isDestroyed()) restoreWindow.hide();
  } catch {}

  try {
    if (pillWindow && !pillWindow.isDestroyed()) pillWindow.hide();
  } catch {}
}

function hideOverlayCompletely() {
  if (!mainWindow || mainWindow.isDestroyed()) return;

  try {
    mainWindow.hide();
  } catch {}

  ensureRestoreWindow();

  try {
    suppressRestoreFocus = true;

    try {
      if (typeof restoreWindow.showInactive === "function") restoreWindow.showInactive();
      else restoreWindow.show();
      restoreWindow.minimize();
    } catch {}

    setTimeout(() => {
      suppressRestoreFocus = false;
    }, 200);
  } catch {}
}

function collapseToPill() {
  if (!mainWindow || mainWindow.isDestroyed()) return;

  const wa = getPrimaryWorkArea();
  const mainBounds = mainWindow.getBounds();
  const pillBounds = getPillBounds();

  winStore.set("mainBounds", mainBounds);
  winStore.set("pillAnchor", {
    offsetX: Math.max(0, mainBounds.x - wa.x),
    offsetY: Math.max(0, wa.y + wa.height - (mainBounds.y + mainBounds.height)),
  });

  ensurePillWindow();

  try {
    mainWindow.hide();
  } catch {}

  try {
    pillWindow.setBounds(pillBounds);
    pillWindow.showInactive();
    pillWindow.moveTop();
  } catch {}
}

function ensureTray() {
  if (tray) return;

  let icon = null;
  try {
    icon = nativeImage.createFromPath(ICON_ICO);
  } catch {
    icon = null;
  }

  tray = new Tray(icon);
  tray.setToolTip("TheWay");

  const buildMenu = () =>
    Menu.buildFromTemplate([
      { label: "Show TheWay", click: () => showOverlayInactive() },
      { label: "Minimize to Pill", click: () => collapseToPill() },
      {
        label: "Quit",
        click: () => {
          isQuitting = true;
          app.quit();
        },
      },
    ]);

  tray.setContextMenu(buildMenu());
  tray.on("double-click", () => {
    if (pillWindow && !pillWindow.isDestroyed() && pillWindow.isVisible()) collapseToPill();
    else showOverlayInactive();
  });
}

function ensureRestoreWindow() {
  if (restoreWindow && !restoreWindow.isDestroyed()) return;

  restoreWindow = new BrowserWindow({
    width: 1,
    height: 1,
    x: -10000,
    y: -10000,
    show: false,
    frame: false,
    transparent: true,
    focusable: true,
    skipTaskbar: true,
    alwaysOnTop: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false,
    },
  });

  restoreWindow.loadURL(
    "data:text/html;charset=utf-8," +
      encodeURIComponent(
        "<!doctype html><html><body style='background:transparent'></body></html>",
      ),
  );

  const restore = () => {
    if (suppressRestoreFocus) return;
    showOverlayInactive();
    setTimeout(() => {
      try {
        if (restoreWindow && !restoreWindow.isDestroyed()) restoreWindow.hide();
      } catch {}
    }, 50);
  };

  restoreWindow.on("focus", restore);
  restoreWindow.on("closed", () => {
    restoreWindow = null;
  });
}

function ensurePillWindow() {
  if (pillWindow && !pillWindow.isDestroyed()) return;

  let iconDataUrl = "";
  try {
    const img = nativeImage.createFromPath(ICON_PNG).resize({ width: 28, height: 28 });
    iconDataUrl = img.toDataURL();
  } catch {
    iconDataUrl = "";
  }

  pillWindow = new BrowserWindow({
    width: 28,
    height: 28,
    show: false,
    frame: false,
    transparent: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    focusable: false,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false,
    },
  });

  const html = `
<!doctype html>
<html>
  <head><meta charset="utf-8"/></head>
  <body style="margin:0; background: transparent; overflow:hidden;">
    <img id="icon" src="${iconDataUrl}" draggable="false"
      style="width:28px;height:28px; cursor:pointer; user-select:none; -webkit-user-drag:none;" />
    <script>
      const { ipcRenderer } = require("electron");
      document.getElementById("icon").addEventListener("click", () => ipcRenderer.send("pill:restore"));
    </script>
  </body>
</html>`;
  pillWindow.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(html));

  pillWindow.on("show", () => {
    try {
      pillWindow.setAlwaysOnTop(true, "screen-saver");
      pillWindow.showInactive();
    } catch {}
  });

  pillWindow.on("closed", () => {
    pillWindow = null;
  });
}

async function createWindow() {
  mainWindow = new MainWindow();

  if (process.platform === "win32") {
    try {
      app.setAppUserModelId("com.theway.app");
    } catch {}
  }

  mainWindow.loadURL(buildAppUrl(null));

if (isDev) {
  const options = { loadExtensionOptions: { allowFileAccess: true } };

  try {
    await installExtension(REDUX_DEVTOOLS, options);
  } catch (err) {
    console.log("Redux DevTools install failed:", err.message);
  }

  try {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } catch (err) {
    console.log("Opening DevTools failed:", err.message);
  }
}

  try {
    mainWindow.setSkipTaskbar(true);
  } catch {}

  mainWindow.on("closed", () => app.quit());
}

function sendCrosshairToDcs(enabled) {
  try {
    const net = require("net");
    const client = new net.Socket();
    client.connect(42070, "127.0.0.1", function () {
      client.write(
        JSON.stringify({ type: "crosshair", payload: enabled ? "true" : "false" }) + "\n",
      );
      client.end();
    });
    client.on("error", () => {});
  } catch {}
}

function hideUnitImportAndReleaseFocus() {
  if (!unitImportWindow || unitImportWindow.isDestroyed()) return;

  try {
    if (unitImportWindow.webContents) unitImportWindow.webContents.blur();
  } catch {}

  try {
    unitImportWindow.blur();
  } catch {}

  try {
    unitImportWindow.setFocusable(false);
  } catch {}

  try {
    unitImportWindow.hide();
  } catch {}

  sendCrosshairToDcs(false);

  ensureRestoreWindow();

  try {
    suppressRestoreFocus = true;

    try {
      if (typeof restoreWindow.showInactive === "function") restoreWindow.showInactive();
      else restoreWindow.show();
      restoreWindow.minimize();
    } catch {}

    setTimeout(() => {
      suppressRestoreFocus = false;
    }, 200);
  } catch {}

 /* setTimeout(() => {
    if (!unitImportWindow || unitImportWindow.isDestroyed()) return;
    try {
      unitImportWindow.setFocusable(true);
    } catch {}
    try {
      unitImportWindow.setAlwaysOnTop(true, "screen-saver");
    } catch {}
  }, 100); */
} 

function createOrShowUnitImport() {
  if (unitImportWindow && !unitImportWindow.isDestroyed()) {
    try {
      unitImportWindow.setFocusable(true);
    } catch {}

    try {
      unitImportWindow.setAlwaysOnTop(true, "screen-saver");
    } catch {}

    if (unitImportWindow.isMinimized()) unitImportWindow.restore();
    unitImportWindow.show();
    unitImportWindow.moveTop();
    unitImportWindow.focus();
    sendCrosshairToDcs(true);
    return;
  }

  const saved = winStore.get("unitImportBounds");

  unitImportWindow = new BrowserWindow({
    title: "TheWay - Unit Import",
    width: saved?.width ?? 1400,
    height: saved?.height ?? 900,
    x: saved?.x,
    y: saved?.y,
    minWidth: 250,
    minHeight: 225,
    alwaysOnTop: true,
    focusable: true,
    skipTaskbar: false,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false,
    },
  });

  unitImportWindow.setAlwaysOnTop(true, "screen-saver");
  unitImportWindow.setVisibleOnAllWorkspaces(true);

  unitImportWindow.on("show", () => {
    try {
      unitImportWindow.setFocusable(true);
    } catch {}

    try {
      unitImportWindow.setAlwaysOnTop(true, "screen-saver");
    } catch {}

    unitImportWindow.moveTop();
    unitImportWindow.focus();
    sendCrosshairToDcs(true);
  });

  unitImportWindow.on("hide", () => {
    sendCrosshairToDcs(false);
  });

  unitImportWindow.loadURL(buildAppUrl("unitImport"));

  unitImportWindow.webContents.on("render-process-gone", (_e, details) => {
    console.error("[UnitImport] render-process-gone:", details);
  });

  unitImportWindow.once("ready-to-show", () => {
    try {
      unitImportWindow.setFocusable(true);
    } catch {}

    try {
      unitImportWindow.setAlwaysOnTop(true, "screen-saver");
    } catch {}

    unitImportWindow.show();
    unitImportWindow.moveTop();
    unitImportWindow.focus();
  });

  unitImportWindow.on("close", (e) => {
    try {
      winStore.set("unitImportBounds", unitImportWindow.getBounds());
    } catch {}

    if (!isQuitting) {
      e.preventDefault();
      hideUnitImportAndReleaseFocus();
    }
  });

  unitImportWindow.on("closed", () => {
    sendCrosshairToDcs(false);
    unitImportWindow = null;
  });
}

const isTheOnlyInstance = app.requestSingleInstanceLock();
if (!isTheOnlyInstance) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) showOverlayInactive();
  });

  app.on("before-quit", () => {
    isQuitting = true;
  });

  app.whenReady().then(() => {
    createWindow();
    ensureTray();

    udpListener = new UDPListener(mainWindow, () => unitImportWindow);
    fileHandler = new FileHandler(mainWindow);
    udpSender = new UDPSender();
    userPreferenceHandler = new UserPreferenceHandler(
      mainWindow,
      applyElectronPreferences,
    );

    ipcMain.removeAllListeners("minimize");
    ipcMain.on("minimize", (_event, opts) => {
      const mode = opts?.mode;
      const shift = opts?.shift === true || opts?.shiftKey === true;

      if (mode === "pill" || shift) collapseToPill();
      else hideOverlayCompletely();
    });

    ipcMain.removeAllListeners("minimizeToPill");
    ipcMain.on("minimizeToPill", () => collapseToPill());

    ipcMain.removeAllListeners("restoreMain");
    ipcMain.on("restoreMain", () => showOverlayInactive());

    ipcMain.removeAllListeners("pill:restore");
    ipcMain.on("pill:restore", () => showOverlayInactive());

    ipcMain.removeAllListeners("close");
    ipcMain.on("close", () => {
      try {
        app.quit();
      } catch {}
    });

    ipcMain.removeAllListeners("focus");
    ipcMain.on("focus", () => {
      if (!mainWindow || mainWindow.isDestroyed()) return;

      try {
        mainWindow.setFocusable(true);
      } catch {}

      try {
        if (mainWindow.isMinimized()) mainWindow.restore();
      } catch {}

      try {
        mainWindow.show();
      } catch {}

      try {
        mainWindow.focus();
      } catch {}

      try {
        if (mainWindow.webContents) mainWindow.webContents.focus();
      } catch {}

      try {
        mainWindow.setAlwaysOnTop(true, "screen-saver");
      } catch {}
    });

        ipcMain.removeAllListeners("defocus");
    ipcMain.on("defocus", () => {
      if (!mainWindow || mainWindow.isDestroyed()) return;

      try {
        if (mainWindow.webContents) mainWindow.webContents.blur();
      } catch {}

      try {
        mainWindow.blur();
      } catch {}

      try {
        mainWindow.setFocusable(false);
      } catch {}
    });

    ipcMain.removeAllListeners("f10Start");
    ipcMain.on("f10Start", () => {
      crosshairWindow = new CrosshairWindow();
    });

    ipcMain.removeAllListeners("f10Stop");
    ipcMain.on("f10Stop", () => {
      if (crosshairWindow) crosshairWindow.close();
      crosshairWindow = null;
    });

    ipcMain.removeAllListeners("unitImport:addWaypoints");
    ipcMain.removeAllListeners("unitImport:close");
    ipcMain.removeAllListeners("openUnitImport");
    ipcMain.removeAllListeners("closeUnitImport");

    ipcMain.on("unitImport:addWaypoints", (_event, waypoints) => {
      if (mainWindow && mainWindow.webContents) {
        mainWindow.webContents.send("unitImport:addWaypoints", waypoints);
      }
    });

    ipcMain.on("unitImport:close", () => {
      hideUnitImportAndReleaseFocus();
    });

    ipcMain.removeAllListeners("unitImport:defocus");

    ipcMain.on("unitImport:defocus", () => {
    hideUnitImportAndReleaseFocus();
    });

    ipcMain.on("openUnitImport", () => {
      createOrShowUnitImport();
    });

    ipcMain.on("closeUnitImport", () => {
      hideUnitImportAndReleaseFocus();
    });

    function applyElectronPreferences(preferences) {
      const alwaysOnTop = preferences["alwaysOnTop"];
      const crosshairColor = preferences["crosshairColor"];
      setupKeybinds(mainWindow, preferences);

      if (alwaysOnTop === false) {
        mainWindow.setAlwaysOnTop(false, "screen-saver");
      }

      if (crosshairColor && crosshairWindow) {
        crosshairWindow.webContents.send("crosshairColor", crosshairColor);
      }
    }
  });

  app.on("window-all-closed", () => app.quit());
}