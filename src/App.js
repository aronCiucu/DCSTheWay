import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SourceSelector from "./components/SourceSelector";
import WaypointList from "./components/WaypointList";
import { dcsPointActions } from "./store/dcsPoint";
import theWayTheme from "./theme/TheWayTheme";
import TransferControls from "./components/TransferControls";
import TitleBar from "./components/TitleBar";
import ConvertModuleWaypoints from "./utils/ConvertModuleWaypoints";
import GetModuleCommands from "./utils/GetModuleCommands";
import TwoOptionsDialog from "./components/TwoOptionsDialog";

const { ipcRenderer } = window.require("electron");

const theme = createTheme(theWayTheme);

function App() {
  const dispatch = useDispatch();
  const module = useSelector((state) => state.dcsPoint.module);
  const dcsWaypoints = useSelector((state) => state.waypoints.dcsWaypoints);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogOption1, setDialogOption1] = useState("");
  const [dialogOption2, setDialogOption2] = useState("");
  const [dialogResult, setDialogResult] = useState("");

  useEffect(() => {
    ipcRenderer.on("dataReceived", (event, msg) => {
      dispatch(dcsPointActions.changeCoords(JSON.parse(msg)));
    });
  }, [dispatch]);

  const handleTransfer = async () => {
    // let specialOptions = {};
    const moduleWaypoints = ConvertModuleWaypoints(dcsWaypoints, module);
    // if (module === "AH-64D_BLK_II") {
    //   setDialogTitle("What seat are you in?");
    //   setDialogOption1("Pilot");
    //   setDialogOption2("CPG/Gunner");
    //   await TwoOptionsDialog.show();
    // }
    const commands = GetModuleCommands(module, moduleWaypoints);
    ipcRenderer.send("transfer", commands);
  };

  const handleDialogClose = (value) => {
    setDialogOpen(false);
    setDialogResult(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <TitleBar />
      {/*<TwoOptionsDialog*/}
      {/*  isOpen={dialogOpen}*/}
      {/*  title={dialogTitle}*/}
      {/*  option1={dialogOption1}*/}
      {/*  option2={dialogOption2}*/}
      {/*  onClose={handleDialogClose}*/}
      {/*/>*/}
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
