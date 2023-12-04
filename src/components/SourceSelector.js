import { MenuItem, Select, Fab, Grid, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import "./SourceSelector.css";
import Banner from "./Banner";
import { inputMethods, supportedModules } from "../utils/constants";

const SourceSelector = ({
  handleSelectionToggle,
  module,
  inputMethod,
  setInputMethod,
  isSelecting,
}) => {
  const handleInputMethodChange = (event) => {
    setInputMethod(event.target.value);
  };

  const isSupportedModule = supportedModules.includes(module);
  const imagePath =
    module === "Spectator" || module === null
      ? "./assets/defaultImage.jpg"
      : `./assets/moduleImages/${module}.jpg`;
  const moduleText =
    module === null
      ? "No Connection To DCS"
      : isSupportedModule
      ? module
      : `Module Not Supported: ${module}`;

  return (
    <>
      <div className="parent-container">
        <Banner text={moduleText} imagePath={imagePath} />

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
                placement="top"
                arrow
                title={
                  isSelecting ? "Finish selection" : "Begin waypoint selection"
                }
              >
                <Fab
                  color={isSelecting ? "secondary" : "primary"}
                  aria-label={
                    isSelecting ? "Stop selection" : "Begin selection"
                  }
                  disabled={inputMethod !== "From a file" && module === null}
                  onClick={handleSelectionToggle}
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
