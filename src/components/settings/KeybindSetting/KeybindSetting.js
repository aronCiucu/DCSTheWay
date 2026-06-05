import { Stack, Typography } from "@mui/material";
import KeybindItem from "./KeybindItem";

const KeybindSetting = ({ settingChangeHandler, preferences }) => {
  const optionKeybinds = preferences?.optionDialogKeybinds || {};

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

      {/* Existing keybinds */}
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

      {/* --- NEW Option Dialog Keybinds --- */}
      <Typography variant="subtitle2" sx={{ mt: 2 }}>
        Option Dialog Keybinds (op1–op4)
      </Typography>
      <KeybindItem
        name={"Option 1"}
        preferenceKey={"optionDialogKeybinds.op1"}
        changeKeybindHandler={settingChangeHandler}
        value={optionKeybinds.op1 || ""}
      />
      <KeybindItem
        name={"Option 2"}
        preferenceKey={"optionDialogKeybinds.op2"}
        changeKeybindHandler={settingChangeHandler}
        value={optionKeybinds.op2 || ""}
      />
      <KeybindItem
        name={"Option 3"}
        preferenceKey={"optionDialogKeybinds.op3"}
        changeKeybindHandler={settingChangeHandler}
        value={optionKeybinds.op3 || ""}
      />
      <KeybindItem
        name={"Option 4"}
        preferenceKey={"optionDialogKeybinds.op4"}
        changeKeybindHandler={settingChangeHandler}
        value={optionKeybinds.op4 || ""}
      />
    </Stack>
  );
};

export default KeybindSetting;
