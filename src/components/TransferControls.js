import { Fab, Grid, Tooltip, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useSelector } from "react-redux";

const TransferControls = (props) => {
  const waypointList = useSelector((state) => state.waypoints.dcsWaypoints);
  let hasWaypoints = waypointList.length > 0;

  return (
    <>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item>
          <Tooltip title="Save waypoints to file">
            <Fab
              size="medium"
              color="neutral"
              onClick={props.onSaveFile}
              disabled={!hasWaypoints}
            >
              <FileDownloadIcon
                style={hasWaypoints ? { color: "white" } : {}}
              />
            </Fab>
          </Tooltip>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={props.onTransfer}
            disabled={!hasWaypoints}
          >
            <Typography variant="button" pr={2}>
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
