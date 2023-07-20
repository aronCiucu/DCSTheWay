import {uiActions} from "../store/ui";

const { ipcRenderer } = window.require("electron");
const saveUserPreferences = (newPreferences) => {
    dispatch(uiActions.setUserPreferences(newPreferences));
    ipcRenderer.send("savePreferences", newPreferences);
}

export default saveUserPreferences;