import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { uiActions } from "./store/ui";

const { ipcRenderer } = window.require("electron");

const theme = createTheme(theWayTheme);

function App() {
  const { module } = useSelector((state) => state.dcsPoint);
  const dcsWaypoints = useSelector((state) => state.waypoints.dcsWaypoints);
  const userPreferences = useSelector((state) => state.ui.userPreferences);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [inputMethod, setInputMethod] = useState("F10 Map");
  const [isSelecting, setIsSelecting] = useState(false);
  const buttonExtraDelay = userPreferences["buttonDelay"] ?? 0;
  const oldCrosshair = userPreferences["oldCrosshair"];
  const dispatch = useDispatch();
  useElectronIpcListeners();

  const handleTransfer = useCallback(async () => {
    if (!module || !dcsWaypoints.length) return;
    const moduleWaypoints = ConvertModuleWaypoints(dcsWaypoints, module);
    const chosenSeat = await askUserAboutSeat(module, userPreferences);
    const commands = {
      type: "waypoints",
      payload: GetModuleCommands(chosenSeat, moduleWaypoints, buttonExtraDelay),
    };
    ipcRenderer.send("messageToDcs", commands);
  }, [dcsWaypoints, module, userPreferences]);

  const handleFileSave = useCallback(() => {
    ipcRenderer.send("saveFile", JSON.stringify(dcsWaypoints));
  }, [dcsWaypoints]);

  const handleSelectionToggle = useCallback(() => {
    if (!isSelecting) {
      if (inputMethod === "F10 Map") {
        if (oldCrosshair) {
          ipcRenderer.send("f10Start");
        } else {
          ipcRenderer.send("messageToDcs", {
            type: "crosshair",
            payload: "true",
          });
        }
        dispatch(uiActions.changePendingWaypoint(true));
        setIsSelecting(true);
      } else if (inputMethod === "From a file") {
        ipcRenderer.send("openFile");
      }
    } else {
      if (inputMethod === "F10 Map") {
        if (oldCrosshair) {
          ipcRenderer.send("f10Stop");
        } else {
          ipcRenderer.send("messageToDcs", {
            type: "crosshair",
            payload: "false",
          });
        }
        dispatch(uiActions.changePendingWaypoint(false));
        setIsSelecting(false);
      }
    }
  }, [isSelecting, inputMethod, oldCrosshair]);

  useEffect(() => {
    ipcRenderer.on("transferWaypoints", handleTransfer);
    ipcRenderer.on("toggleCrosshair", handleSelectionToggle);
    return () => {
      ipcRenderer.removeAllListeners("transferWaypoints");
      ipcRenderer.removeAllListeners("toggleCrosshair");
    };
  }, [handleTransfer, handleSelectionToggle]);

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
          <SourceSelector
            handleSelectionToggle={handleSelectionToggle}
            module={module}
            inputMethod={inputMethod}
            setInputMethod={setInputMethod}
            isSelecting={isSelecting}
          />
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
