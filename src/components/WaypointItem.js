import {
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Grid,
  TextField,
  Typography,
  Input,
} from "@mui/material";
import {
  DragHandle,
  ArrowDropDown,
  ArrowDropUp,
  Delete,
} from "@mui/icons-material";
import { useState } from "react";

const WaypointItem = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={7}>
          {isExpanded ? (
            <Stack>
              <TextField
                size="small"
                defaultValue={props.name}
                onChange={(e) => props.onRename(e, props.id)}
              ></TextField>

              <Input disabled value={props.latHem + " " + props.lat}></Input>
              <Input disabled value={props.longHem + " " + props.long}></Input>
              <Input
                value={props.elev}
                onChange={(e) => props.onElevation(e, props.id)}
              ></Input>
            </Stack>
          ) : (
            <ListItemText>{props.name}</ListItemText>
          )}
        </Grid>
        <Grid item xs={5}>
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
              <IconButton onClick={(e) => props.onDelete(e, props.id)}>
                <Delete />
              </IconButton>
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
