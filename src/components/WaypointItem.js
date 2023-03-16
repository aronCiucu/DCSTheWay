import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { DragHandle, ArrowDropDown } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const WaypointItem = (props) => {
  const handleSave = () => {};

  return (
    <Card
      sx={{ borderRadius: "10px", backgroundColor: grey[800], margin: "6px" }}
    >
      <Box sx={{ padding: "12px" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="button">{props.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" color={grey[500]}>
                  N042.06.969 E045.34.464
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            {props.pending ? (
              <Button variant="contained" onClick={props.onSave}>
                Save
              </Button>
            ) : (
              <Stack direction="row" alignItems="center">
                <IconButton>
                  <ArrowDropDown />
                </IconButton>
                <DragHandle />
              </Stack>
            )}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default WaypointItem;
