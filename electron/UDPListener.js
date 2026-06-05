const dgram = require("dgram");

class UDPListener {
  /**
   * @param {BrowserWindow} mainWindow
   * @param {() => (import("electron").BrowserWindow | null)} [getUnitImportWindow]
   */
  constructor(mainWindow, getUnitImportWindow) {
    const socket = dgram.createSocket("udp4");
    const inFlight = new Map();

    const GC_INTERVAL_MS = 2000;
    const STALE_MS = 15000;

    const gcTimer = setInterval(() => {
      const now = Date.now();
      for (const [snapId, s] of inFlight.entries()) {
        if (now - (s.lastSeen || 0) > STALE_MS) {
          inFlight.delete(snapId);
        }
      }
    }, GC_INTERVAL_MS);

    if (gcTimer.unref) gcTimer.unref();

    const sendToUnitImport = (payload) => {
      try {
        const unitWin =
          typeof getUnitImportWindow === "function" ? getUnitImportWindow() : null;
        if (unitWin && !unitWin.isDestroyed()) {
          unitWin.webContents.send("intel:snapshotResult", payload);
        }
      } catch {}
    };

    socket.on("message", (msg) => {
      const str = "" + msg;

      try {
        mainWindow.webContents.send("dataReceived", str);
      } catch {}

      let parsed = null;
      try {
        parsed = JSON.parse(str);
      } catch {
        return;
      }

      if (!parsed || typeof parsed.cmd !== "string") return;

      if (parsed.cmd === "INTEL_SNAPSHOT_RESULT" && Array.isArray(parsed.units)) {
        sendToUnitImport(parsed);
        return;
      }

      if (parsed.cmd === "INTEL_SNAPSHOT_BEGIN") {
        const snapId = parsed.snapId;
        if (snapId === undefined || snapId === null) return;

        inFlight.set(String(snapId), {
          origin: parsed.origin ?? null,
          units: [],
          lastSeen: Date.now(),
          count: Number.isFinite(parsed.count) ? parsed.count : null,
        });
        return;
      }

      if (parsed.cmd === "INTEL_SNAPSHOT_PART") {
        const snapId = parsed.snapId;
        if (snapId === undefined || snapId === null) return;

        const key = String(snapId);
        const existing = inFlight.get(key);
        if (!existing) {
          inFlight.set(key, {
            origin: null,
            units: [],
            lastSeen: Date.now(),
            count: null,
          });
        }

        const snap = inFlight.get(key);
        snap.lastSeen = Date.now();

        if (Array.isArray(parsed.units)) {
          snap.units.push(...parsed.units);
        }
        return;
      }

      if (parsed.cmd === "INTEL_SNAPSHOT_DONE") {
        const snapId = parsed.snapId;
        if (snapId === undefined || snapId === null) return;

        const key = String(snapId);
        const snap = inFlight.get(key);
        if (!snap) return;

        inFlight.delete(key);

        sendToUnitImport({
          cmd: "INTEL_SNAPSHOT_RESULT",
          origin: snap.origin,
          units: snap.units,
        });
      }
    });

    socket.bind(42069);
  }
}

module.exports = UDPListener;
