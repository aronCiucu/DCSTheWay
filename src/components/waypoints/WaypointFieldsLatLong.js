import { Box, Grid, Input, Typography } from "@mui/material";

const WaypointFieldsLatLong = ({
  id,
  latHem,
  longHem,
  lat,
  long,
  elev,
  onElevation,
  handleInputFocus,
  handleInputDefocus,
  handleInputFinished,
}) => {
  return (
    <Box sx={{ mx: 0.5 }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="overline" color="grey">
            LAT
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Input disabled value={latHem + " " + lat} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="overline" color="grey">
            LONG
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Input disabled value={longHem + " " + long}></Input>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="overline" color="grey">
            ELEV
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            value={elev}
            onChange={(e) => onElevation(e, id)}
            onMouseEnter={handleInputFocus}
            onMouseLeave={handleInputDefocus}
            onKeyDown={handleInputFinished}
          ></Input>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WaypointFieldsLatLong;
