import { Box, Stack, Typography } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SettingsDialog.css";
const { ipcRenderer } = window.require("electron");

const CrosshairColorSetting = ({ settingChangeHandler }) => {
  const userPreferences = useSelector((state) => state.ui.userPreferences);

  const [crosshairColor, setCrosshairColor] = useState("#7CFC00FF");
  useEffect(() => {
    const color = userPreferences["crosshairColor"];
    if (color) setCrosshairColor(color);
  }, [userPreferences["crosshairColor"]]);

  return (
    <Stack direction={"column"}>
      <Typography id="crosshair-color" gutterBottom>
        Crosshair color
      </Typography>
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
  );
};

export default CrosshairColorSetting;
