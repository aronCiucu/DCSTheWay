import ah6j from "../moduleCommands/ah6j";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let abortRequested = false;

function applyExtraDelay(commands, buttonExtraDelay) {
  return (commands || []).map((cmd) => ({
    ...cmd,
    delay: (cmd.delay ?? 0) + buttonExtraDelay,
  }));
}

function isReplaceModule(module) {
  return /(?:_|-)REPLACE$/i.test(module || "");
}

function isNewFlightPlanModule(module) {
  return /(?:_|-)NEWFPLN$/i.test(module || "");
}

function row1IsWP0(row1) {
  return /\bWP0\b/i.test(String(row1 || "").trim());
}

async function readRow1(ipcRenderer) {
  const response = await ipcRenderer.invoke("messageToDcsRequest", {
    cmd: "GET_PARAM_HANDLES",
    handles: ["TNL3100_ROW1"],
  });

  return response?.HandleData?.TNL3100_ROW1 || "";
}

async function readRow2(ipcRenderer) {
  const response = await ipcRenderer.invoke("messageToDcsRequest", {
    cmd: "GET_PARAM_HANDLES",
    handles: ["TNL3100_ROW2"],
  });

  return response?.HandleData?.TNL3100_ROW2 || "";
}

async function sendCommands(ipcRenderer, commands) {
  ipcRenderer.send("messageToDcs", {
    type: "waypoints",
    payload: commands,
  });
}

export function requestAbortAH6JTransfer() {
  abortRequested = true;
}

export function clearAbortAH6JTransfer() {
  abortRequested = false;
}

function throwIfAborted() {
  if (abortRequested) {
    throw new Error("AH6J_TRANSFER_ABORTED");
  }
}

function getBusy() {
  return window.__thewayBusy === true;
}

async function waitForBusyCycle({
  appearTimeout = 5000,
  clearTimeout = 15000,
  settleMs = 300,
  pollMs = 50,
} = {}) {
  const appearStart = Date.now();

  // wait for busy to go true
  while (!getBusy()) {
    throwIfAborted();

    if (Date.now() - appearStart > appearTimeout) {
      throw new Error("AH6J_BUSY_DID_NOT_GO_TRUE");
    }

    await sleep(pollMs);
  }

  const clearStart = Date.now();

  // wait for busy to go false
  while (getBusy()) {
    throwIfAborted();

    if (Date.now() - clearStart > clearTimeout) {
      throw new Error("AH6J_BUSY_DID_NOT_CLEAR");
    }

    await sleep(pollMs);
  }

  // settle before next batch
  await sleep(settleMs);
  throwIfAborted();
}

async function sendCommandsAndWaitForBusy(ipcRenderer, commands) {
  await sendCommands(ipcRenderer, commands);
  await waitForBusyCycle();
}

async function prepareReplaceMode({ buttonExtraDelay, ipcRenderer }) {
  let wp0SeenInARow = 0;

  while (wp0SeenInARow < 3) {
    throwIfAborted();

    const row1 = await readRow1(ipcRenderer);

    if (row1IsWP0(row1)) {
      wp0SeenInARow += 1;
    } else {
      wp0SeenInARow = 0;

      const deleteCurrent = applyExtraDelay(
        ah6j.buildDeleteCurrentWaypointCommands(),
        buttonExtraDelay,
      );

      await sendCommandsAndWaitForBusy(ipcRenderer, deleteCurrent);
      throwIfAborted();
    }

    const stepPrevious = applyExtraDelay(
      ah6j.buildStepToPreviousWaypointCommands(),
      buttonExtraDelay,
    );

    await sendCommandsAndWaitForBusy(ipcRenderer, stepPrevious);
  }
}

export default async function ah6jTransfer({
  module,
  moduleWaypoints,
  buttonExtraDelay,
  ipcRenderer,
  setRunning,
}) {
  clearAbortAH6JTransfer();
  setRunning(true);

  try {
    if (module) {
      ah6j.slotVariant = module;
    }

    throwIfAborted();

    const initial = applyExtraDelay(
      ah6j.buildInitialModeCommands(),
      buttonExtraDelay,
    );

    await sendCommandsAndWaitForBusy(ipcRenderer, initial);
    throwIfAborted();

    const newFlightPlanMode = isNewFlightPlanModule(module);

    if (isReplaceModule(module) || newFlightPlanMode) {
      await prepareReplaceMode({ buttonExtraDelay, ipcRenderer });
      throwIfAborted();
    }

    for (let i = 0; i < moduleWaypoints.length; i++) {
      throwIfAborted();

      const openCreate = applyExtraDelay(
        ah6j.buildWaypointEntryPageCommands(),
        buttonExtraDelay,
      );

      await sendCommandsAndWaitForBusy(ipcRenderer, openCreate);
      throwIfAborted();

      const display = {
        row2: await readRow2(ipcRenderer),
      };

      // keep this for now, even with busy-driven batching
      await sleep(300 + buttonExtraDelay);

      const commands = applyExtraDelay(
        ah6j.createWaypointCommandsFromDisplay(
          moduleWaypoints[i],
          i + 1,
          display,
        ),
        buttonExtraDelay,
      );

      await sendCommandsAndWaitForBusy(ipcRenderer, commands);
      throwIfAborted();
    }

    if (newFlightPlanMode) {
      throwIfAborted();

      const buildFlightPlan = applyExtraDelay(
        ah6j.buildNewFlightPlanFromListCommands(moduleWaypoints.length),
        buttonExtraDelay,
      );

      await sendCommandsAndWaitForBusy(ipcRenderer, buildFlightPlan);
      throwIfAborted();
    }
  } catch (err) {
    if (err?.message !== "AH6J_TRANSFER_ABORTED") {
      throw err;
    }
  } finally {
    clearAbortAH6JTransfer();
    setRunning(false);
  }
}