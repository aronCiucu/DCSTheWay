import {
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Grid,
  TextField,
  Box,
  Tooltip,
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
import WaypointFieldsMGRS from "./WaypointFieldsMGRS";
import WaypointFieldsLatLong from "./WaypointFieldsLatLong";

const { ipcRenderer } = window.require("electron");

const WaypointItem = ({
  wp,
  pending,
  onSave,
  onDelete,
  onRename,
  expanded,
  onExpand,
  onElevation,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: wp.id });
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
      onExpand(wp.id, !expanded);
      handleInputDefocus();
    }
  };

  return (
    <Grow in>
      <ListItem ref={setNodeRef} style={style} {...attributes}>
        <Grid container>
          <Grid item xs={7}>
            <Collapse in={expanded} collapsedSize={25}>
              <Stack>
                {expanded ? (
                  <TextField
                    size="small"
                    defaultValue={wp.name}
                    onChange={(e) => onRename(e, wp.id)}
                    onMouseEnter={handleInputFocus}
                    onMouseLeave={handleInputDefocus}
                    onKeyDown={handleInputFinished}
                    onFocus={(e) => e.target.select()}
                  />
                ) : (
                  <ListItemText>{wp.name}</ListItemText>
                )}

                {wp.MGRS ? (
                  <WaypointFieldsMGRS
                    id={wp.id}
                    mgrs={wp.MGRS}
                    elev={wp.elev}
                    onElevation={onElevation}
                    handleInputFocus={handleInputFocus}
                    handleInputDefocus={handleInputDefocus}
                    handleInputFinished={handleInputFinished}
                  />
                ) : (
                  <WaypointFieldsLatLong
                    id={wp.id}
                    latHem={wp.latHem}
                    longHem={wp.longHem}
                    lat={wp.lat}
                    long={wp.long}
                    elev={wp.elev}
                    onElevation={onElevation}
                    handleInputFocus={handleInputFocus}
                    handleInputDefocus={handleInputDefocus}
                    handleInputFinished={handleInputFinished}
                  />
                )}
              </Stack>
            </Collapse>
          </Grid>
          <Grid item xs={5}>
            {pending ? (
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Tooltip title="Save waypoint">
                  <Button variant="contained" onClick={onSave}>
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
                <IconButton onClick={(e) => onDelete(e, wp.id)}>
                  <Delete />
                </IconButton>
                <IconButton onClick={() => onExpand(wp.id, !expanded)}>
                  {expanded ? <ArrowDropUp /> : <ArrowDropDown />}
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
