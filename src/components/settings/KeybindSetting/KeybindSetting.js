import { Stack, Typography } from "@mui/material";
import KeybindItem from "./KeybindItem";

const KeybindSetting = ({ settingChangeHandler }) => {
  return (
    <Stack direction={"column"}>
      <Typography gutterBottom>Keybindings</Typography>
      <Typography variant="caption">
        Click in the below boxes, then press a key combination. Press Delete to
        remove a keybinding.
      </Typography>
      <Typography variant="caption" sx={{ color: "tomato", pb: 1 }}>
        Restart of the app is needed to apply the new bindings.
      </Typography>

      <KeybindItem
        name={"Toggle Crosshair"}
        preferenceKey={"crosshairKeybind"}
        changeKeybindHandler={settingChangeHandler}
      />
      <KeybindItem
        name={"Save Waypoint"}
        preferenceKey={"saveKeybind"}
        changeKeybindHandler={settingChangeHandler}
      />
      <KeybindItem
        name={"Delete Last Waypoint"}
        preferenceKey={"deleteLastKeybind"}
        changeKeybindHandler={settingChangeHandler}
      />
      <KeybindItem
        name={"Delete All Waypoints"}
        preferenceKey={"deleteAllKeybind"}
        changeKeybindHandler={settingChangeHandler}
      />
      <KeybindItem
        name={"Transfer Waypoints"}
        preferenceKey={"transferKeybind"}
        changeKeybindHandler={settingChangeHandler}
      />
    </Stack>
  );
};

export default KeybindSetting;
