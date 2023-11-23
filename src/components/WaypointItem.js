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
  Tooltip,
  Typography,
  Collapse,
  Grow,
} from "@mui/material";
import {
  DragHandle,
  ArrowDropDown,
  ArrowDropUp,
  Delete,
} from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./WaypointItem.css";

const { ipcRenderer } = window.require("electron");

const WaypointItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleInputFocus = () => {
    ipcRenderer.send("focus");
  };
  const handleInputDefocus = (event) => {
    ipcRenderer.send("defocus");
    event.target.blur();
  };
  const handleInputFinished = (event) => {
    if (event.key === "Enter") {
      props.onExpand(props.id, !props.expanded);
      handleInputDefocus();
    }
  };

  return (
    <Grow in>
      <ListItem ref={setNodeRef} style={style} {...attributes}>
        <Grid container>
          <Grid item xs={7}>
            <Collapse in={props.expanded} collapsedSize={25}>
              <Stack>
                {props.expanded ? (
                  <TextField
                    size="small"
                    defaultValue={props.name}
                    onChange={(e) => props.onRename(e, props.id)}
                    onMouseEnter={handleInputFocus}
                    onMouseLeave={handleInputDefocus}
                    onKeyDown={handleInputFinished}
                    onFocus={(e) => e.target.select()}
                  />
                ) : (
                  <ListItemText>{props.name}</ListItemText>
                )}

                <Box sx={{ mx: 0.5 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <Typography variant="overline" color="grey">
                        LAT
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Input disabled value={props.latHem + " " + props.lat} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <Typography variant="overline" color="grey">
                        LONG
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Input
                        disabled
                        value={props.longHem + " " + props.long}
                      ></Input>
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
                        value={props.elev}
                        onChange={(e) => props.onElevation(e, props.id)}
                        onMouseEnter={handleInputFocus}
                        onMouseLeave={handleInputDefocus}
                        onKeyDown={handleInputFinished}
                      ></Input>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Collapse>
          </Grid>
          <Grid item xs={5}>
            {props.pending ? (
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Tooltip title="Save waypoint">
                  <Button variant="contained" onClick={props.onSave}>
                    Save
                  </Button>
                </Tooltip>
              </Stack>
            ) : (
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <IconButton onClick={(e) => props.onDelete(e, props.id)}>
                  <Delete />
                </IconButton>
                <IconButton
                  onClick={() => props.onExpand(props.id, !props.expanded)}
                >
                  {props.expanded ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
                <Box className="dragHandle" {...listeners}>
                  <DragHandle />
                </Box>
              </Stack>
            )}
          </Grid>
        </Grid>
      </ListItem>
    </Grow>
  );
};

export default WaypointItem;
