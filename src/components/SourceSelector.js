import { MenuItem, Select, Fab, Grid, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SourceSelector.css";
import { uiActions } from "../store/ui";
import Banner from "./Banner";

const { ipcRenderer } = window.require("electron");

const inputMethods = ["F10 Map", "From a file"];
const supportedModules = [
  "F-16C_50",
  "F-16I",
  "FA-18C_hornet",
  "AH-64D_BLK_II",
  "A-10C_2",
  "A-10C",
  "M-2000C",
  "AV8BNA",
  "Ka-50",
  "Ka-50_3",
];
const SourceSelector = () => {
  const [inputMethod, setInputMethod] = useState("F10 Map");
  const [isSelecting, setIsSelecting] = useState(false);
  const module = useSelector((state) => state.dcsPoint.module);
  const dispatch = useDispatch();
  const handleInputMethodChange = (event) => {
    setInputMethod(event.target.value);
  };
  const handleFab = () => {
    if (!isSelecting) {
      if (inputMethod === "F10 Map") {
        ipcRenderer.send("f10Start");
        dispatch(uiActions.changePendingWaypoint(true));
        setIsSelecting(true);
      } else if (inputMethod === "From a file") {
        ipcRenderer.send("openFile");
      }
    } else {
      if (inputMethod === "F10 Map") {
        ipcRenderer.send("f10Stop");
        dispatch(uiActions.changePendingWaypoint(false));
        setIsSelecting(false);
      }
    }
  };

  const isSupportedModule = supportedModules.includes(module);

  return (
    <>
      <div className="parent-container">
        {module === null ? (
          <Banner
            text="No Connection To DCS"
            imagePath={"/assets/defaultImage.jpg"}
          ></Banner>
        ) : isSupportedModule ? (
          <Banner
            text={module}
            imagePath={`/assets/moduleImages/${module}.jpg`}
          ></Banner>
        ) : (
          <Banner
            text="Module Not Supported"
            imagePath={"/assets/defaultImage.jpg"}
          ></Banner>
        )}

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
                inputProps={{
                  MenuProps: {
                    MenuListProps: {
                      sx: {
                        backgroundColor: "background.default",
                      },
                    },
                  },
                }}
              >
                {inputMethods.map((im) => (
                  <MenuItem key={im} value={im}>
                    {im}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <Tooltip
                title={isSelecting ? "End selection" : "Start selection"}
              >
                <Fab
                  color={isSelecting ? "secondary" : "primary"}
                  aria-label={
                    isSelecting ? "Stop selection" : "Begin selection"
                  }
                  disabled={module === null}
                  onClick={handleFab}
                >
                  {isSelecting ? <CloseIcon /> : <AddIcon />}
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SourceSelector;
