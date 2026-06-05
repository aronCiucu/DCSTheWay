const { uIOhook, UiohookKey } = require("uiohook-napi");

const parseKeybind = (keybindValue) => {
  if (!keybindValue || keybindValue === "None") return null;

  const keys = keybindValue.split("+");
  const isCtrl = keys.includes("CTRL");
  const isShift = keys.includes("SHIFT");
  const isAlt = keys.includes("ALT");
  const key = keys.at(-1);

  const keycode = UiohookKey[key];
  if (typeof keycode !== "number") return null;

  return { isCtrl, isShift, isAlt, keycode };
};

const setupKeybinds = (mainWindow, preferences) => {
  // Build a list of actions + their parsed keybind matchers
  const bindings = [];

  const addBinding = (name, keybindValue, action) => {
    const parsed = parseKeybind(keybindValue);
    if (!parsed) return;
    bindings.push({ name, ...parsed, action });
  };

  addBinding(
    "crosshairKeybind",
    preferences["crosshairKeybind"],
    () => mainWindow.webContents.send("toggleCrosshair"),
  );

  addBinding(
    "saveKeybind",
    preferences["saveKeybind"],
    () => mainWindow.webContents.send("saveWaypoint"),
  );

  addBinding(
    "deleteLastKeybind",
    preferences["deleteLastKeybind"],
    () => mainWindow.webContents.send("deleteLastWaypoint"),
  );

  addBinding(
    "deleteAllKeybind",
    preferences["deleteAllKeybind"],
    () => mainWindow.webContents.send("deleteWaypoints"),
  );

  addBinding(
    "transferKeybind",
    preferences["transferKeybind"],
    () => mainWindow.webContents.send("transferWaypoints"),
  );

  // Option dialog keybinds (op1-op4)
  addBinding(
    "optionOp1Keybind",
    preferences?.optionDialogKeybinds?.op1,
    () => mainWindow.webContents.send("optionDialogSelect", "op1"),
  );

  addBinding(
    "optionOp2Keybind",
    preferences?.optionDialogKeybinds?.op2,
    () => mainWindow.webContents.send("optionDialogSelect", "op2"),
  );

  addBinding(
    "optionOp3Keybind",
    preferences?.optionDialogKeybinds?.op3,
    () => mainWindow.webContents.send("optionDialogSelect", "op3"),
  );

  addBinding(
    "optionOp4Keybind",
    preferences?.optionDialogKeybinds?.op4,
    () => mainWindow.webContents.send("optionDialogSelect", "op4"),
  );

  // Remove any previous listeners (important if setupKeybinds is called more than once)
  uIOhook.removeAllListeners("keydown");
  uIOhook.removeAllListeners("keyup");

  let keydown = false;

  uIOhook.on("keydown", (event) => {
    if (keydown) return;

    for (const b of bindings) {
      if (
        event.ctrlKey === b.isCtrl &&
        event.shiftKey === b.isShift &&
        event.altKey === b.isAlt &&
        event.keycode === b.keycode
      ) {
        keydown = true;
        b.action();
        break;
      }
    }
  });

  uIOhook.on("keyup", () => {
    keydown = false;
  });

  // Restart hook cleanly
  try {
    uIOhook.stop();
  } catch (_) {}
  uIOhook.start();
};

module.exports = setupKeybinds;
