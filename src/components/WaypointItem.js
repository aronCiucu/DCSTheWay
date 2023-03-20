import {
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Input,
  Stack,
  Box,
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
      <Stack direction="column" style={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between">
          <ListItemText>{props.name}</ListItemText>
          <Box>
            {props.pending ? (
              <Button variant="contained" onClick={props.onSave}>
                Save
              </Button>
            ) : (
              <>
                <IconButton onClick={handleExpand}>
                  {isExpanded ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
                <DragHandle />
              </>
            )}
          </Box>
        </Stack>
        {isExpanded && (
          <>
            <Input value={props.name}></Input>
            <Input value={props.lat}></Input>
            <Input value={props.long}></Input>
            <Input value={props.elev}></Input>
          </>
        )}
      </Stack>
    </ListItem>
  );
};

export default WaypointItem;
