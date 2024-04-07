import { Fab, Grid, Tooltip, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useSelector } from "react-redux";
import ah64 from "../moduleCommands/ah64";
import f15e from "../moduleCommands/f15e";
import f16 from "../moduleCommands/f16";
import fa18 from "../moduleCommands/fa18";

const TransferControls = (props) => {
  const waypointList = useSelector((state) => state.waypoints.dcsWaypoints);
  const { module } = useSelector((state) => state.dcsPoint);
  const allowSaveFile = waypointList.length > 0;
  const allowTransfer = allowSaveFile && module && module !== "Spectator";
  const dcsStartableAircraft = { 
    "Spectator": {get: function() {return false}},
    "AH-64D_BLK_II": {get: function() {return ah64.hasOwnProperty('storedStart') ? ah64.storedStart : false}},
    "F-15ESE": {get: function() {return f15e.hasOwnProperty('storedStart') ? f15e.storedStart : false}},
    "F-16C_50": {get: function() {return f16.hasOwnProperty('storedStart') ? f16.storedStart : false}},
    "FA-18C_hornet": {get: function() {return fa18.hasOwnProperty('storedStart') ? fa18.storedStart : false}},
  }
  const storedStart = dcsStartableAircraft.hasOwnProperty(module) ? dcsStartableAircraft[module].get() : false
  console.log(dcsStartableAircraft.hasOwnProperty(module))

  return (
    <>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item>
        {storedStart ? 
          (<Tooltip title="Save waypoints to file">
            <Fab
              size="small"
              color="neutral"
              onClick={props.onSaveFile}
              disabled={!allowSaveFile}
            >
              <FileDownloadIcon
                style={allowSaveFile ? { color: "white" } : {}}
              />
            </Fab>
          </Tooltip>) : (<Tooltip title="Save waypoints to file">
            <Fab
              size="large"
              color="neutral"
              onClick={props.onSaveFile}
              disabled={!allowSaveFile}
            >
              <FileDownloadIcon
                style={allowSaveFile ? { color: "white" } : {}}
              />
            </Fab>
          </Tooltip>)
        }
        </Grid>
        <Grid item>
        {storedStart ? 
          (<Tooltip title="Start Aircraft">
            <Fab
              size="small"
              color="black"
              onClick={props.onAircraftStart}
              disabled={false}
            >
            </Fab>
          </Tooltip>) : null }
        </Grid>
        {storedStart ? 
        (<Grid item>
          <Fab
            size="small"
            variant="extended"
            color="primary"
            onClick={props.onTransfer}
            disabled={!allowTransfer}
          >
            <Typography variant="button" pr={1}>
              <b>Transfer to DCS</b>
            </Typography>
            <SendIcon />
          </Fab>
        </Grid>) : (<Grid item>
          <Fab
            size="large"
            variant="extended"
            color="primary"
            onClick={props.onTransfer}
            disabled={!allowTransfer}
          >
            <Typography variant="button" pr={1}>
              <b>Transfer to DCS</b>
            </Typography>
            <SendIcon />
          </Fab>
        </Grid>)}
      </Grid>
    </>
  );
};
export default TransferControls;
