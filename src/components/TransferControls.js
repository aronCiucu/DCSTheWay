import { Fab, Grid, Tooltip, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useSelector } from "react-redux";

const TransferControls = (props) => {
  const waypointList = useSelector((state) => state.waypoints.dcsWaypoints);
  let showButton = waypointList.length > 0;

  return (
    <>
      {showButton && (
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item>
            <Tooltip title="Save waypoints to file">
              <Fab size="medium" color="neutral" onClick={props.onSaveFile}>
                <FileDownloadIcon style={{ color: "white" }} />
              </Fab>
            </Tooltip>
          </Grid>
          <Grid item>
            <Fab variant="extended" color="primary" onClick={props.onTransfer}>
              <Typography variant="button" pr={2}>
                <b>Transfer to DCS</b>
              </Typography>
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default TransferControls;
