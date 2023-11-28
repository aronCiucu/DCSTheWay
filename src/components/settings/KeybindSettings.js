import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
const { ipcRenderer } = window.require("electron");

const KeybindItem = ({ name, preferenceKey, defaultKey }) => {
  const userPreferences = useSelector((state) => state.ui.userPreferences);
  const keybind = userPreferences[preferenceKey] || defaultKey;

  const handleKeyPress = (e) => {
    console.log(e);
  };

  const handleInputFocus = () => {
    ipcRenderer.send("focus");
  };
  const handleInputDefocus = (event) => {
    ipcRenderer.send("defocus");
    event.target.blur();
  };

  return (
    <Grid container sx={{ py: 0.5 }}>
      <Grid xs={4}>
        <Typography variant="body2">{name}</Typography>
      </Grid>
      <Grid xs={8}>
        <TextField
          size="small"
          onMouseEnter={handleInputFocus}
          onMouseLeave={handleInputDefocus}
          onKeyDown={handleKeyPress}
          defaultValue={keybind}
        />
      </Grid>
    </Grid>
  );
};
const KeybindSettings = ({ settingChangeHandler }) => {
  return (
    <Stack direction={"column"}>
      <Typography gutterBottom>Keybindings</Typography>

      <KeybindItem
        name={"Toggle Crosshair"}
        preferenceKey={"crosshairKeybind"}
        defaultKey={"CTRL+SHIFT+C"}
      />
      <KeybindItem name={"Save Waypoint"} preferenceKey={"saveKeybind"} />
      <KeybindItem
        name={"Delete Last Waypoint"}
        preferenceKey={"deleteLastKeybind"}
        defaultKey={"CTRL+SHIFT+D"}
      />
      <KeybindItem
        name={"Delete All Waypoints"}
        preferenceKey={"deleteAllKeybind"}
        defaultKey={"CTRL+SHIFT+R"}
      />
      <KeybindItem
        name={"Transfer Waypoints"}
        preferenceKey={"transferKeybind"}
        defaultKey={"CTRL+SHIFT+T"}
      />
    </Stack>
  );
};

export default KeybindSettings;
