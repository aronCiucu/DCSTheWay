import { createTheme, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import SourceSelector from "./components/SourceSelector";
import WaypointList from "./components/WaypointList";
import { dcsActions } from "./store/dcs";
import theWayTheme from "./theme/TheWayTheme";

const { ipcRenderer } = window.require("electron");

const theme = createTheme(theWayTheme);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on("dataReceived", (event, msg) => {
      dispatch(dcsActions.changeCoords(JSON.parse(msg)));
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container direction="column">
        <Grid item>
          <SourceSelector />
        </Grid>
        <Grid item>
          <WaypointList />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
