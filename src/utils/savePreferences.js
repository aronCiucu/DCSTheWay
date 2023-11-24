const { ipcRenderer } = window.require("electron");
export const saveModulePreferences = (newPreferences) => {
  ipcRenderer.send("saveModulePreferences", newPreferences);
};
export const saveSettingsPreferences = (newPreferences) => {
  ipcRenderer.send("saveSettingsPreferences", newPreferences);
};
