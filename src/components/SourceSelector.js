import { MenuItem, Select, Stack, Card, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SourceSelector.css";
import InputMethod from "../model/InputMethod";
import { uiActions } from "../store/ui";

const { ipcRenderer } = window.require("electron");

const inputMethods = [
  InputMethod.F10_MAP,
  InputMethod.FILE,
  InputMethod.MANUAL,
];
const SourceSelector = () => {
  const [inputMethod, setInputMethod] = useState(InputMethod.F10_MAP);
  const [isSelecting, setIsSelecting] = useState(false);
  const module = useSelector((state) => state.dcsPoint.module);
  const dispatch = useDispatch();
  const handleInputMethodChange = (event) => {
    setInputMethod(event.target.value);
  };
  const handleFab = () => {
    if (!isSelecting) {
      if (inputMethod === InputMethod.F10_MAP) {
        ipcRenderer.send("f10Start");
        dispatch(uiActions.changePendingWaypoint(true));
        setIsSelecting(true);
      } else if (inputMethod === InputMethod.FILE) {
        //file input
      } else if (inputMethod === InputMethod.MANUAL) {
        //manual input
      }
    } else {
      if (inputMethod === InputMethod.F10_MAP) {
        ipcRenderer.send("f10Stop");
        dispatch(uiActions.changePendingWaypoint(false));
        setIsSelecting(false);
      }
    }
  };

  return (
    <>
      <div className="parent-container">
        <img
          className="image-container"
          src={`/assets/moduleImages/${module}.png`}
        />
        <div className="selection-method">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            px={2}
          >
            <Grid item xs>
              <Select
                value={inputMethod}
                onChange={handleInputMethodChange}
                sx={{ width: "100%" }}
                size="small"
              >
                {inputMethods.map((im) => (
                  <MenuItem key={im.name} value={im.name}>
                    {im.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <Fab
                color={isSelecting ? "secondary" : "primary"}
                aria-label={isSelecting ? "Stop selection" : "Begin selection"}
                onClick={handleFab}
              >
                {isSelecting ? <CloseIcon /> : <AddIcon />}
              </Fab>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SourceSelector;
