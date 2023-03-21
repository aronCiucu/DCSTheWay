import { Fab, Grid, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";

const TransferControls = () => {
  const waypointList = useSelector((state) => state.waypoints.dcsWaypoints);
  let showButton = waypointList.length > 0;

  return (
    <>
      {showButton && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item>
            <Fab variant="extended" color="primary">
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
