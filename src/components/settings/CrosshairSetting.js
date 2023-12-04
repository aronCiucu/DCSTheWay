import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SettingsDialog.css";
const { ipcRenderer } = window.require("electron");

const CrosshairSetting = ({ settingChangeHandler }) => {
  const userPreferences = useSelector((state) => state.ui.userPreferences);
  const oldCrosshair = userPreferences["oldCrosshair"];
  const userPreferenceColor = userPreferences["crosshairColor"];

  const [crosshairColor, setCrosshairColor] = useState("#7CFC00FF");
  useEffect(() => {
    const color = userPreferenceColor;
    if (color) setCrosshairColor(color);
  }, [userPreferenceColor]);

  return (
    <Stack direction={"column"}>
      <Typography id="crosshair-color" gutterBottom sx={{ m: 0 }}>
        Crosshair options
      </Typography>

      <Stack direction="column" spacing={1}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={oldCrosshair}
                onChange={(e) =>
                  settingChangeHandler("oldCrosshair", e.target.checked)
                }
              />
            }
            label={"Old style crosshair"}
          />
          <Typography variant="caption">
            The old crosshair has customizable colors, but does not show in VR
            or work correctly with multiple monitors.
          </Typography>
        </FormGroup>
        {oldCrosshair && (
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2">Color</Typography>
            <Box sx={{ width: "100%" }}>
              <MuiColorInput
                value={crosshairColor}
                onChange={_.debounce((color) => {
                  settingChangeHandler("crosshairColor", color);
                  ipcRenderer.send("color", color);
                }, 150)}
                format="hex"
                isAlphaHidden
              />
            </Box>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default CrosshairSetting;
