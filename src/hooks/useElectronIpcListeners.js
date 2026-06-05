import { useEffect } from "react";
import { dcsPointActions } from "../store/dcsPoint";
import { waypointsActions } from "../store/waypoints";
import { uiActions } from "../store/ui";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "lodash";


const { ipcRenderer } = window.require("electron");

const useElectronIpcListeners = () => {
  const dispatch = useDispatch();
  const { lat, long, elev, module } = useSelector((state) => state.dcsPoint);
  const dcsWaypointsCount = useSelector(
    (state) => state.waypoints.dcsWaypoints.length,
  );

  useEffect(() => {
    const onSaveWaypoint = () => {
      if (module && lat && long) {
        dispatch(
          waypointsActions.addDcsWaypoint({
            lat,
            long,
            elev,
          }),
        );
      }
    };

    const onUnitImportAddWaypoints = (_event, units) => {
      if (!Array.isArray(units)) return;

      const startIndex = dcsWaypointsCount;

      units.forEach((u, idx) => {
        const latNum = Number(u.lat);
        const longNum = Number(u.lon ?? u.long);
        const elevNumRaw = Number(u.elevM ?? u.elev);
        const elevNum = Number.isFinite(elevNumRaw) ? elevNumRaw : 1;

        if (!Number.isFinite(latNum) || !Number.isFinite(longNum)) return;

        const typeStr =
          (typeof u.type === "string" && u.type.trim()) ||
          (typeof u.unitType === "string" && u.unitType.trim()) ||
          (typeof u.className === "string" && u.className.trim()) ||
          (typeof u.name === "string" && u.name.trim()) ||
          "UNIT";

        const wpNumber = startIndex + idx + 1;

        dispatch(
          waypointsActions.addDcsWaypoint({
            lat: latNum,
            long: longNum,
            elev: elevNum,
            name: `${wpNumber} ${typeStr}`,
          }),
        );
      });
    };

    const onFileOpened = (_event, msg) => {
      dispatch(waypointsActions.appendWaypoints(msg));
    };

    const onDeleteWaypoints = () => {
      dispatch(waypointsActions.deleteAll());
    };

    const onDeleteLastWaypoint = () => {
      dispatch(waypointsActions.deleteLast());
    };

    const onPreferencesReceived = (_e, preferences) => {
      dispatch(uiActions.setUserPreferences(preferences));
    };

    ipcRenderer.removeListener("saveWaypoint", onSaveWaypoint);
    ipcRenderer.removeListener("unitImport:addWaypoints", onUnitImportAddWaypoints);
    ipcRenderer.removeListener("fileOpened", onFileOpened);
    ipcRenderer.removeListener("deleteWaypoints", onDeleteWaypoints);
    ipcRenderer.removeListener("deleteLastWaypoint", onDeleteLastWaypoint);
    ipcRenderer.removeListener("preferencesReceived", onPreferencesReceived);

    ipcRenderer.on("saveWaypoint", onSaveWaypoint);
    ipcRenderer.on("unitImport:addWaypoints", onUnitImportAddWaypoints);
    ipcRenderer.on("fileOpened", onFileOpened);
    ipcRenderer.on("deleteWaypoints", onDeleteWaypoints);
    ipcRenderer.on("deleteLastWaypoint", onDeleteLastWaypoint);
    ipcRenderer.on("preferencesReceived", onPreferencesReceived);

    return () => {
      ipcRenderer.removeListener("saveWaypoint", onSaveWaypoint);
      ipcRenderer.removeListener("unitImport:addWaypoints", onUnitImportAddWaypoints);
      ipcRenderer.removeListener("fileOpened", onFileOpened);
      ipcRenderer.removeListener("deleteWaypoints", onDeleteWaypoints);
      ipcRenderer.removeListener("deleteLastWaypoint", onDeleteLastWaypoint);
      ipcRenderer.removeListener("preferencesReceived", onPreferencesReceived);
    };
  }, [lat, long, elev, module, dcsWaypointsCount, dispatch]);

useEffect(() => {
  ipcRenderer.send("getPreferences");

  let lastBusy = null;
  let lastBusyTs = null;

  const onDataReceived = throttle((_event, msg) => {
  const data = JSON.parse(msg);

  // expose busy globally for transfer modules
  window.__thewayBusy = data?.busy === true;

  const now = performance.now();

    if (data?.busy !== lastBusy) {
      const delta =
        lastBusyTs == null ? "first" : `${Math.round(now - lastBusyTs)}ms`;

      console.log(
        `[BUSY] ${Math.round(now)}ms | ${lastBusy} -> ${data?.busy} | gap: ${delta}`
      );

      lastBusy = data?.busy;
      lastBusyTs = now;
    }

    dispatch(dcsPointActions.changeCoords(data));

    if (data?.HandleData) {
      window.tnl3100Row1 = data.HandleData.TNL3100_ROW1;
      window.tnl3100Row2 = data.HandleData.TNL3100_ROW2;
    }
  }, 100);

  ipcRenderer.removeAllListeners("dataReceived");
  ipcRenderer.on("dataReceived", onDataReceived);

  return () => {
    ipcRenderer.removeListener("dataReceived", onDataReceived);
    if (typeof onDataReceived.cancel === "function") {
      onDataReceived.cancel();
    }
  };
}, [dispatch]);
};

export default useElectronIpcListeners;
