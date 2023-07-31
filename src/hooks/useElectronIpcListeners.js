import {useEffect} from "react";
import {dcsPointActions} from "../store/dcsPoint";
import {waypointsActions} from "../store/waypoints";
import {uiActions} from "../store/ui";
import {useDispatch} from "react-redux";
import {throttle} from "lodash";

const {ipcRenderer} = window.require("electron");

const useElectronIpcListeners = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        ipcRenderer.on("dataReceived", throttle((event, msg) => {
            dispatch(dcsPointActions.changeCoords(JSON.parse(msg)));
          }, 100));
        ipcRenderer.on("fileOpened", (event, msg) => {
            dispatch(waypointsActions.appendWaypoints(msg));
        });
        ipcRenderer.on("deleteWaypoints", () => {
            dispatch(waypointsActions.deleteAll());
        });
        ipcRenderer.on("preferencesReceived", (e, preferences) => {
            dispatch(uiActions.setUserPreferences(preferences));
        });
        ipcRenderer.send("getPreferences");
    }, []);
}

export default useElectronIpcListeners;