const { uIOhook, UiohookKey } = require("uiohook-napi");

const setupKeybinds = (mainWindow, preferences) => {
  const allKeybinds = {
    crosshairKeybind: preferences["crosshairKeybind"],
    saveKeybind: preferences["saveKeybind"],
    deleteLastKeybind: preferences["deleteLastKeybind"],
    deleteAllKeybind: preferences["deleteAllKeybind"],
    transferKeybind: preferences["transferKeybind"],
  };
  for (const [keybindName, keybindValue] of Object.entries(allKeybinds)) {
    if (!keybindValue || keybindValue === "None") continue;
    const keys = keybindValue.split("+");
    const isCtrl = keys.includes("CTRL");
    const isShift = keys.includes("SHIFT");
    const isAlt = keys.includes("ALT");
    const key = keys.at(-1);
    let keydown = false;
    uIOhook.stop();
    uIOhook.on("keydown", (event) => {
      if (keydown) return;
      if (
        event.ctrlKey === isCtrl &&
        event.shiftKey === isShift &&
        event.altKey === isAlt &&
        event.keycode === UiohookKey[key]
      ) {
        keydown = true;
        switch (keybindName) {
          case "crosshairKeybind":
            mainWindow.webContents.send("toggleCrosshair");
            break;
          case "saveKeybind":
            mainWindow.webContents.send("saveWaypoint");
            break;
          case "deleteLastKeybind":
            mainWindow.webContents.send("deleteLastWaypoint");
            break;
          case "deleteAllKeybind":
            mainWindow.webContents.send("deleteWaypoints");
            break;
          case "transferKeybind":
            mainWindow.webContents.send("transferWaypoints");
            break;
        }
      }
    });
    uIOhook.on("keyup", () => {
      keydown = false;
    });
    uIOhook.start();
  }
};

module.exports = setupKeybinds;
