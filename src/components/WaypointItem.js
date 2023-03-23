import {
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Grid,
  TextField,
  Input,
  Box,
} from "@mui/material";
import {
  DragHandle,
  ArrowDropDown,
  ArrowDropUp,
  Delete,
} from "@mui/icons-material";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./WaypointItem.css";

const { ipcRenderer } = window.require("electron");

const WaypointItem = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputFocus = (event) => {
    ipcRenderer.send("focus");
  };
  const handleInputDefocus = () => {
    ipcRenderer.send("defocus");
  };

  return (
    <ListItem ref={setNodeRef} style={style} {...attributes}>
      <Grid container>
        <Grid item xs={7}>
          {isExpanded ? (
            <Stack>
              <TextField
                size="small"
                defaultValue={props.name}
                onChange={(e) => props.onRename(e, props.id)}
                autoFocus
                onMouseEnter={handleInputFocus}
                onMouseLeave={handleInputDefocus}
              ></TextField>

              <Input disabled value={props.latHem + " " + props.lat}></Input>
              <Input disabled value={props.longHem + " " + props.long}></Input>
              <Input
                value={props.elev}
                onChange={(e) => props.onElevation(e, props.id)}
                onMouseEnter={handleInputFocus}
                onMouseLeave={handleInputDefocus}
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
              <Box className="dragHandle" {...listeners}>
                <DragHandle />
              </Box>
            </Stack>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default WaypointItem;
