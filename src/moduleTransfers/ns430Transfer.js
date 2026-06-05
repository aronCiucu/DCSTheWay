// ============================================================
// NS430 TRANSFER CONTROLLER
// Handles sending waypoint data from TheWay to the NS430
// by generating command sequences and transmitting them to DCS
// ============================================================

import ns430 from "../moduleCommands/ns430";

// ============================================================
// BASIC UTILITY HELPERS
// ============================================================

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let abortRequested = false;

// ============================================================
// COMMAND TIMING HELPERS
// ============================================================

function applyExtraDelay(commands, buttonExtraDelay) {
  return (commands || []).map((cmd) => ({
    ...cmd,
    delay: (cmd.delay ?? 0) + buttonExtraDelay,
  }));
}

// ============================================================
// DCS COMMUNICATION
// ============================================================

async function sendCommands(ipcRenderer, commands) {
  ipcRenderer.send("messageToDcs", {
    type: "waypoints",
    payload: commands,
  });
}

// ============================================================
// BUSY-DRIVEN WAIT HELPERS
// ============================================================

function getBusy() {
  return window.__thewayBusy === true;
}

async function waitForBusyCycle({
  appearTimeout = 5000,
  clearTimeout = 60000,
  settleMs = 300,
  pollMs = 50,
} = {}) {
  const appearStart = Date.now();

  // Wait for busy to become true
  while (!getBusy()) {
    throwIfAborted();

    if (Date.now() - appearStart > appearTimeout) {
      throw new Error("NS430_BUSY_DID_NOT_GO_TRUE");
    }

    await sleep(pollMs);
  }

  const clearStart = Date.now();

  // Wait for busy to become false
  while (getBusy()) {
    throwIfAborted();

    if (Date.now() - clearStart > clearTimeout) {
      throw new Error("NS430_BUSY_DID_NOT_CLEAR");
    }

    await sleep(pollMs);
  }

  // Small settle pause before next batch
  await sleep(settleMs);
  throwIfAborted();
}

async function sendCommandsAndWaitForBusy(ipcRenderer, commands) {
  await sendCommands(ipcRenderer, commands);
  await waitForBusyCycle();
}

// ============================================================
// WAYPOINT NAME FORMATTER
// ============================================================

function generateSequentialDefaultName(index) {
  const num = Math.max(1, (Number(index) || 0) + 1);
  return `WAY${String(num).padStart(2, "0")}`.slice(0, 5);
}

function isDefaultWaypointName(rawName, fallbackIndex) {
  const trimmed = String(rawName ?? "").trim();

  if (!trimmed) {
    return true;
  }

  if (/^Waypoint\s+\d+$/i.test(trimmed)) {
    return true;
  }

  return trimmed.toUpperCase() === generateSequentialDefaultName(fallbackIndex);
}

function formatNs430WaypointName(rawName, fallbackIndex) {
  const trimmed = String(rawName ?? "").trim();

  if (!trimmed) {
    return generateSequentialDefaultName(fallbackIndex);
  }

  const standardWaypointMatch = /^Waypoint\s+(\d+)$/i.exec(trimmed);
  if (standardWaypointMatch) {
    return generateSequentialDefaultName(fallbackIndex);
  }

  let name = trimmed
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 5);

  if (!name) {
    return generateSequentialDefaultName(fallbackIndex);
  }

  if (name.length < 5) {
    const remaining = 5 - name.length;
    const suffix = String(fallbackIndex + 1)
      .padStart(remaining, "0")
      .slice(-remaining);
    name = (name + suffix).slice(0, 5);
  }

  return name;
}

// ============================================================
// AIRCRAFT POSITION REQUEST
// ============================================================

async function requestOwnPositionSnapshot(ipcRenderer) {
  const response = await ipcRenderer.invoke("messageToDcsRequest", {
    cmd: "GET_OWN_POSITION",
  });

  if (!response || response.ok !== true) {
    const errorList = Array.isArray(response?.ErrorList)
      ? response.ErrorList.filter(Boolean)
      : [];
    const fallbackError = response?.error || response?.raw || "GET_OWN_POSITION failed";
    throw new Error(errorList[0] || fallbackError);
  }

  const ownPosition = response.OwnPosition || {};
  const lat = Number(ownPosition.lat);
  const long = Number(ownPosition.long);
  const alt = Number(ownPosition.alt ?? 0);

  if (!Number.isFinite(lat) || !Number.isFinite(long)) {
    throw new Error(`Invalid own-position snapshot received: ${JSON.stringify(response)}`);
  }

  return {
    lat,
    long,
    alt,
    model: ownPosition.model || null,
  };
}

// ============================================================
// TRANSFER ABORT CONTROL
// ============================================================

export function requestAbortNS430Transfer() {
  abortRequested = true;
}

export function clearAbortNS430Transfer() {
  abortRequested = false;
}

function throwIfAborted() {
  if (abortRequested) {
    throw new Error("NS430_TRANSFER_ABORTED");
  }
}

// ============================================================
// MAIN NS430 WAYPOINT TRANSFER FUNCTION
// ============================================================

export default async function ns430Transfer({
  module,
  moduleWaypoints,
  buttonExtraDelay,
  ipcRenderer,
  setRunning,
}) {
  clearAbortNS430Transfer();
  setRunning(true);

  try {
    if (module) {
      ns430.slotVariant = module;
    }

    throwIfAborted();

    // ========================================================
    // INITIAL SETUP
    // Reset NS430 state and delete existing user waypoints
    // ========================================================

    const setup = applyExtraDelay(ns430.buildSetupCommands(), buttonExtraDelay);
    await sendCommandsAndWaitForBusy(ipcRenderer, setup);
    throwIfAborted();


    // ========================================================
    // MAIN WAYPOINT ENTRY LOOP
    // Each iteration creates one waypoint
    // ========================================================

    for (let i = 0; i < moduleWaypoints.length; i += 1) {
      throwIfAborted();

      const wp = moduleWaypoints[i];
      const waypointName = formatNs430WaypointName(wp?.name, i);

      // ----------------------------------------------------
      // Enter waypoint name characters
      // ----------------------------------------------------

      const nameChars = applyExtraDelay(
        ns430.buildNameCharactersCommands(waypointName),
        buttonExtraDelay,
      );
      await sendCommandsAndWaitForBusy(ipcRenderer, nameChars);
      throwIfAborted();

      // ----------------------------------------------------
      // Capture aircraft position
      // Needed because NS430 fills coordinate fields
      // with current aircraft position after name entry
      // ----------------------------------------------------

      const currentPosition = await requestOwnPositionSnapshot(ipcRenderer);
      throwIfAborted();

      // ----------------------------------------------------
      // Confirm waypoint name
      // ----------------------------------------------------

      const confirmName = applyExtraDelay(
        ns430.buildConfirmNameCommands(),
        buttonExtraDelay,
      );
      await sendCommandsAndWaitForBusy(ipcRenderer, confirmName);
      throwIfAborted();

      // ----------------------------------------------------
      // Move cursor to coordinate entry field
      // ----------------------------------------------------

      const moveToPos = applyExtraDelay(
        ns430.buildMoveToPositionFieldCommands(),
        buttonExtraDelay,
      );
      await sendCommandsAndWaitForBusy(ipcRenderer, moveToPos);
      throwIfAborted();

      // ----------------------------------------------------
      // Adjust coordinates from current aircraft position
      // to the target waypoint coordinates
      // ----------------------------------------------------

      const coordinateEntry = applyExtraDelay(
        ns430.buildCoordinateEntryCommands(currentPosition, wp),
        buttonExtraDelay,
      );

      await sendCommandsAndWaitForBusy(ipcRenderer, coordinateEntry);
      throwIfAborted();
    }

    // ========================================================
    // FINAL SAVE
    // Saves the newly entered waypoints to the NS430 database
    // ========================================================

    const saveWaypoint = applyExtraDelay(
      ns430.buildSaveWaypointCommands(),
      buttonExtraDelay,
    );
    await sendCommandsAndWaitForBusy(ipcRenderer, saveWaypoint);
    throwIfAborted();

    // ========================================================
    // CREATE FLIGHT PLAN
    // ========================================================

    const createFlightPlanStart = applyExtraDelay(
      ns430.buildFlightPlanCreateStartCommands(),
      buttonExtraDelay,
    );
    await sendCommandsAndWaitForBusy(ipcRenderer, createFlightPlanStart);
    throwIfAborted();

    // ========================================================
    // FLIGHT PLAN WAYPOINT LOOP
    // Add each entered waypoint name into the new FPL
    // ========================================================

    for (let i = 0; i < moduleWaypoints.length; i += 1) {
      throwIfAborted();

      const wp = moduleWaypoints[i];
      const waypointName = formatNs430WaypointName(wp?.name, i);
      const useFastListMethod = isDefaultWaypointName(wp?.name, i);

      const addFlightPlanWaypoint = applyExtraDelay(
        useFastListMethod
          ? ns430.buildFlightPlanAddWaypointFromListCommands(i + 1)
          : ns430.buildFlightPlanAddWaypointCommands(waypointName, i + 1),
        buttonExtraDelay,
      );

      await sendCommandsAndWaitForBusy(ipcRenderer, addFlightPlanWaypoint);
      throwIfAborted();
    }

    // ========================================================
    // ACTIVATE FLIGHT PLAN
    // ========================================================

    const activateFlightPlan = applyExtraDelay(
      ns430.buildFlightPlanActivateCommands(moduleWaypoints.length),
      buttonExtraDelay,
    );
    await sendCommandsAndWaitForBusy(ipcRenderer, activateFlightPlan);
    throwIfAborted();

  } catch (err) {
    if (err?.message !== "NS430_TRANSFER_ABORTED") {
      throw err;
    }
  } finally {
    clearAbortNS430Transfer();
    setRunning(false);
  }
}