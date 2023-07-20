const { ipcRenderer } = window.require("electron");
const saveUserPreferences = (newPreferences) => {
    ipcRenderer.send("savePreferences", newPreferences);
}

export default saveUserPreferences;