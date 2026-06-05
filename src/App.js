import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "react-modal-promise";

import SourceSelector from "./components/SourceSelector";
import WaypointList from "./components/waypoints/WaypointList";
import TransferControls from "./components/TransferControls";
import TitleBar from "./components/TitleBar";
import SettingsDialog from "./components/settings/SettingsDialog";
import UnitImportDialog from "./components/UnitImportDialog";

import theWayTheme from "./theme/TheWayTheme";
import ConvertModuleWaypoints from "./utils/ConvertModuleWaypoints";
import GetModuleCommands from "./moduleCommands/GetModuleCommands";
import GetTransferCommands from "./moduleTransfers/GetTransferCommands";
import askUserAboutSeat from "./moduleCommands/askUserAboutSeat";
import useElectronIpcListeners from "./hooks/useElectronIpcListeners";
import { uiActions } from "./store/ui";

const { ipcRenderer } = window.require("electron");

const isUnitImportWindow =
  new URLSearchParams(window.location.search).get("window") === "unitImport";

const theme = createTheme(theWayTheme);

function App() {
  const { module } = useSelector((state) => state.dcsPoint);
  const dcsWaypoints = useSelector((state) => state.waypoints.dcsWaypoints);
  const userPreferences = useSelector((state) => state.ui.userPreferences);

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [inputMethod, setInputMethod] = useState("F10 Map");
  const [isSelecting, setIsSelecting] = useState(false);
  const [transferRunning, setTransferRunning] = useState(false);
  const [transferAborting, setTransferAborting] = useState(false);
  const [activeTransferModule, setActiveTransferModule] = useState(null);

  const buttonExtraDelay = userPreferences["buttonDelay"] ?? 0;
  const oldCrosshair = userPreferences["oldCrosshair"];

  const dispatch = useDispatch();
  useElectronIpcListeners();

  // Main window: defocus when mouse leaves
  useEffect(() => {
    if (isUnitImportWindow) return;

    let leaveTimer = null;

    const handleMouseLeave = () => {
      if (leaveTimer) window.clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(() => {
        ipcRenderer.send("defocus");
      }, 50);
    };

    const handleMouseEnter = () => {
      if (leaveTimer) {
        window.clearTimeout(leaveTimer);
        leaveTimer = null;
      }
    };

    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      if (leaveTimer) window.clearTimeout(leaveTimer);
    };
  }, []);

  // Unit import window: defocus/hide when mouse leaves
  useEffect(() => {
    if (!isUnitImportWindow) return;

    let leaveTimer = null;

    const handleMouseLeave = () => {
      if (leaveTimer) window.clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(() => {
        ipcRenderer.send("unitImport:defocus");
      }, 50);
    };

    const handleMouseEnter = () => {
      if (leaveTimer) {
        window.clearTimeout(leaveTimer);
        leaveTimer = null;
      }
    };

    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      if (leaveTimer) window.clearTimeout(leaveTimer);
    };
  }, []);

 const handleTransfer = useCallback(async () => {
  if (!module || !dcsWaypoints.length) return;

  setTransferAborting(false);

  const moduleWaypoints = ConvertModuleWaypoints(dcsWaypoints, module);
  const chosenSeat = await askUserAboutSeat(module, userPreferences);
  const transferModule = GetTransferCommands(chosenSeat);

  if (transferModule?.runTransfer) {
    setTransferRunning(true);
    setActiveTransferModule(chosenSeat);

    try {
      await transferModule.runTransfer({
        module: chosenSeat,
        moduleWaypoints,
        buttonExtraDelay,
        ipcRenderer,
        setRunning: setTransferRunning,
      });
    } finally {
      setTransferRunning(false);
      setTransferAborting(false);
      setActiveTransferModule(null);
    }
    return;
  }

  setTransferRunning(false);
  setActiveTransferModule(null);

  ipcRenderer.send("messageToDcs", {
    type: "waypoints",
    payload: GetModuleCommands(chosenSeat, moduleWaypoints, buttonExtraDelay),
  });
}, [dcsWaypoints, module, userPreferences, buttonExtraDelay]);

  const handleAbort = useCallback(() => {
  if (activeTransferModule) {
    setTransferAborting(true);

    const transferModule = GetTransferCommands(activeTransferModule);
    transferModule?.requestAbort?.();
  }

  ipcRenderer.send("messageToDcs", { type: "abort" });

  if (!activeTransferModule) {
    setTransferRunning(false);
    setTransferAborting(false);
    setActiveTransferModule(null);
  }
}, [activeTransferModule]);

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
      } else if (inputMethod === "Recon Request") {
        ipcRenderer.send("openUnitImport");
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
  }, [dispatch, inputMethod, isSelecting, oldCrosshair]);

  useEffect(() => {
    ipcRenderer.on("transferWaypoints", handleTransfer);
    ipcRenderer.on("toggleCrosshair", handleSelectionToggle);

    return () => {
      ipcRenderer.removeAllListeners("transferWaypoints");
      ipcRenderer.removeAllListeners("toggleCrosshair");
    };
  }, [handleTransfer, handleSelectionToggle]);

  if (isUnitImportWindow) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <UnitImportDialog
          open={true}
          onClose={() => ipcRenderer.send("closeUnitImport")}
          standalone
        />
      </ThemeProvider>
    );
  }

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
            transferRunning={transferRunning}
            transferAborting={transferAborting}
            onTransfer={handleTransfer}
            onAbort={handleAbort}
            onSaveFile={handleFileSave}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;