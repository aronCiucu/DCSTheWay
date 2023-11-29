import { Stack, Typography } from "@mui/material";
import KeybindItem from "./KeybindItem";

const KeybindSetting = ({ settingChangeHandler }) => {
  return (
    <Stack direction={"column"}>
      <Typography gutterBottom>Keybindings</Typography>
      <Typography variant="caption" sx={{ pb: 1 }}>
        Press Delete to remove a keybinding. Restart of the app needed to apply
        the new bindings.
      </Typography>

      <KeybindItem
        name={"Toggle Crosshair"}
        preferenceKey={"crosshairKeybind"}
        defaultKey={"CTRL+SHIFT+C"}
        changeKeybindHandler={settingChangeHandler}
      />
      <KeybindItem
        name={"Save Waypoint"}
        preferenceKey={"saveKeybind"}
        defaultKey={"CTRL+SHIFT+S"}
        changeKeybindHandler={settingChangeHandler}
      />
      <KeybindItem
        name={"Delete Last Waypoint"}
        preferenceKey={"deleteLastKeybind"}
        defaultKey={"CTRL+SHIFT+D"}
        changeKeybindHandler={settingChangeHandler}
      />
      <KeybindItem
        name={"Delete All Waypoints"}
        preferenceKey={"deleteAllKeybind"}
        defaultKey={"CTRL+SHIFT+R"}
        changeKeybindHandler={settingChangeHandler}
      />
      <KeybindItem
        name={"Transfer Waypoints"}
        preferenceKey={"transferKeybind"}
        defaultKey={"CTRL+SHIFT+T"}
        changeKeybindHandler={settingChangeHandler}
      />
    </Stack>
  );
};

export default KeybindSetting;
