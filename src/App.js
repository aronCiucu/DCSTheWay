import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SourceSelector from "./components/SourceSelector";
import WaypointList from "./components/WaypointList";
import { dcsPointActions } from "./store/dcsPoint";
import theWayTheme from "./theme/TheWayTheme";
import TransferControls from "./components/TransferControls";
import TitleBar from "./components/TitleBar";
import ConvertModuleWaypoints from "./utils/ConvertModuleWaypoints";
import GetModuleCommands from "./utils/GetModuleCommands";

const { ipcRenderer } = window.require("electron");

const theme = createTheme(theWayTheme);

function App() {
  const dispatch = useDispatch();
  const module = useSelector((state) => state.dcsPoint.module);
  const dcsWaypoints = useSelector((state) => state.waypoints.dcsWaypoints);

  useEffect(() => {
    ipcRenderer.on("dataReceived", (event, msg) => {
      dispatch(dcsPointActions.changeCoords(JSON.parse(msg)));
    });
  }, [dispatch]);

  const handleTransfer = () => {
    const moduleWaypoints = ConvertModuleWaypoints(dcsWaypoints, module);
    const commands = GetModuleCommands(module, moduleWaypoints);
    ipcRenderer.send("transfer", commands);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <TitleBar />
      <Box sx={{ height: "100vh" }}>
        <Box sx={{ height: "25%" }}>
          <SourceSelector />
        </Box>
        <Box sx={{ height: "60%", paddingX: 2 }}>
          <WaypointList />
        </Box>
        <Box sx={{ height: "15%" }}>
          <TransferControls onTransfer={handleTransfer} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
