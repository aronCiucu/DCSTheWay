import { useEffect } from "react";
import { dcsPointActions } from "../store/dcsPoint";
import { waypointsActions } from "../store/waypoints";
import { uiActions } from "../store/ui";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "lodash";

const { ipcRenderer } = window.require("electron");

const useElectronIpcListeners = () => {
  const dispatch = useDispatch();
  const { lat, long, elev } = useSelector((state) => state.dcsPoint);

  useEffect(() => {
    ipcRenderer.on("saveWaypoint", () => {
      dispatch(
        waypointsActions.addDcsWaypoint({
          lat,
          long,
          elev,
        }),
      );
    });
    ipcRenderer.on("fileOpened", (event, msg) => {
      dispatch(waypointsActions.appendWaypoints(msg));
    });
    ipcRenderer.on("deleteWaypoints", () => {
      dispatch(waypointsActions.deleteAll());
    });
    ipcRenderer.on("preferencesReceived", (e, preferences) => {
      dispatch(uiActions.setUserPreferences(preferences));
    });
    return () => {
      ipcRenderer.removeAllListeners("saveWaypoint");
      ipcRenderer.removeAllListeners("fileOpened");
      ipcRenderer.removeAllListeners("deleteWaypoints");
      ipcRenderer.removeAllListeners("preferencesReceived");
    };
  }, [lat, long, elev]);

  useEffect(() => {
    ipcRenderer.send("getPreferences");
    ipcRenderer.on(
      "dataReceived",
      throttle((event, msg) => {
        dispatch(dcsPointActions.changeCoords(JSON.parse(msg)));
      }, 100),
    );

    return () => {
      ipcRenderer.removeAllListeners("dataReceived");
    };
  }, []);
};

export default useElectronIpcListeners;
