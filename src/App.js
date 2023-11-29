import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalContainer from "react-modal-promise";

import SourceSelector from "./components/SourceSelector";
import WaypointList from "./components/WaypointList";
import theWayTheme from "./theme/TheWayTheme";
import TransferControls from "./components/TransferControls";
import TitleBar from "./components/TitleBar";
import ConvertModuleWaypoints from "./utils/ConvertModuleWaypoints";
import GetModuleCommands from "./moduleCommands/GetModuleCommands";
import askUserAboutSeat from "./moduleCommands/askUserAboutSeat";
import useElectronIpcListeners from "./hooks/useElectronIpcListeners";
import SettingsDialog from "./components/settings/SettingsDialog";

const { ipcRenderer } = window.require("electron");

const theme = createTheme(theWayTheme);

function App() {
  const { module } = useSelector((state) => state.dcsPoint);
  const dcsWaypoints = useSelector((state) => state.waypoints.dcsWaypoints);
  const userPreferences = useSelector((state) => state.ui.userPreferences);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const buttonExtraDelay = userPreferences["buttonDelay"] ?? 0;
  useElectronIpcListeners();

  const handleTransfer = useCallback(async () => {
    if (!module) return;
    const moduleWaypoints = ConvertModuleWaypoints(dcsWaypoints, module);
    const chosenSeat = await askUserAboutSeat(module, userPreferences);
    const commands = GetModuleCommands(
      chosenSeat,
      moduleWaypoints,
      buttonExtraDelay,
    );
    ipcRenderer.send("transfer", commands);
  }, [dcsWaypoints, module, userPreferences]);

  const handleFileSave = useCallback(() => {
    ipcRenderer.send("saveFile", JSON.stringify(dcsWaypoints));
  }, [dcsWaypoints]);

  useEffect(() => {
    ipcRenderer.on("transferWaypoints", handleTransfer);
    return () => {
      ipcRenderer.removeAllListeners("transferWaypoints");
    };
  }, [handleTransfer]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <TitleBar openSettingsHandler={() => setSettingsModalOpen(true)} />
      <ModalContainer />
      <Box sx={{ height: "100vh" }}>
        <SettingsDialog
          open={settingsModalOpen}
          closeHandler={() => setSettingsModalOpen(false)}
        />
        <Box sx={{ height: "25%" }}>
          <SourceSelector />
        </Box>
        <Box sx={{ height: "60%", paddingX: 2 }}>
          <WaypointList />
        </Box>
        <Box sx={{ height: "15%" }}>
          <TransferControls
            onTransfer={handleTransfer}
            onSaveFile={handleFileSave}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
