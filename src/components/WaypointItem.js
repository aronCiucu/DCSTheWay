import {
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Grid,
  TextField,
} from "@mui/material";
import { DragHandle, ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useState } from "react";

const WaypointItem = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={8}>
          {isExpanded ? (
            <>
              <TextField size="small" value={props.name}></TextField>
              <TextField size="small" value={props.lat}></TextField>
              <TextField size="small" value={props.long}></TextField>
              <TextField size="small" value={props.elev}></TextField>
            </>
          ) : (
            <ListItemText>{props.name}</ListItemText>
          )}
        </Grid>
        <Grid item xs={4}>
          {props.pending ? (
            <Button variant="contained" onClick={props.onSave}>
              Save
            </Button>
          ) : (
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <IconButton onClick={handleExpand}>
                {isExpanded ? <ArrowDropUp /> : <ArrowDropDown />}
              </IconButton>
              <DragHandle />
            </Stack>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default WaypointItem;
