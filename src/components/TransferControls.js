import { Fab, Grid, Tooltip, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useSelector } from "react-redux";

const TransferControls = (props) => {
  const waypointList = useSelector((state) => state.waypoints.dcsWaypoints);
  const { module } = useSelector((state) => state.dcsPoint);
  const allowSaveFile = waypointList.length > 0;
  const allowTransfer = allowSaveFile && module && module !== "Spectator";

  return (
    <>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item>
          <Tooltip title="Save waypoints to file">
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
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Start Aircraft">
            <Fab
              size="small"
              color="black"
              onClick={props.onAircraftStart}
            >
            </Fab>
          </Tooltip>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </>
  );
};
export default TransferControls;
