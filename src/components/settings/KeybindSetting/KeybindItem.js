import { useSelector } from "react-redux";
import { Grid, TextField, Typography } from "@mui/material";
const { ipcRenderer } = window.require("electron");

const getByPath = (obj, path) => {
  if (!obj || !path) return undefined;

  // NEW: first try direct key match (supports "optionDialogKeybinds.op1" stored literally)
  if (Object.prototype.hasOwnProperty.call(obj, path)) return obj[path];

  // Then try nested lookup (supports optionDialogKeybinds: { op1: ... })
  if (!path.includes(".")) return obj[path];
  return path.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
};


const KeybindItem = ({ name, preferenceKey, changeKeybindHandler }) => {
  // CHANGED: grab the whole ui slice so we can find where the live value really is
  const ui = useSelector((state) => state.ui);

  // CHANGED: search common locations for preferences
  const candidates = [
    ui?.preferences,
    ui?.userPreferences,
    ui?.settingsPreferences,
    ui?.settings,
    ui, // last resort
  ];

  let keybind;
  for (const c of candidates) {
    const v = getByPath(c, preferenceKey);
    if (v !== undefined) {
      keybind = v;
      break;
    }
  }
  if (!keybind) keybind = "None";

  const handleInputFocus = () => {
    ipcRenderer.send("focus");
  };
  const handleInputDefocus = (event) => {
    ipcRenderer.send("defocus");
    event.target.blur();
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    const key = event.key;
    let code = event.code;
    if (key === "Shift" || key === "Control" || key === "Alt" || event.repeat)
      return;

    if (key === "Delete") {
      changeKeybindHandler(preferenceKey, "None");
    } else {
      const ctrl = event.ctrlKey ? "CTRL+" : "";
      const shift = event.shiftKey ? "SHIFT+" : "";
      const alt = event.altKey ? "ALT+" : "";
      code = code.replace("Key", "").replace("Digit", "");
      const newKeybind = ctrl + shift + alt + code;

      // leave duplicate handling alone for now (we’ll improve later if needed)
      changeKeybindHandler(preferenceKey, newKeybind, false);
    }
  };

  return (
    <>
      <Grid container sx={{ py: 0.5 }}>
        <Grid item xs={4}>
          <Typography variant="body2">{name}</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            size="small"
            multiline
            InputProps={{
              readOnly: true,
            }}
            value={keybind}
            onKeyDown={handleKeyPress}
            onMouseEnter={handleInputFocus}
            onMouseLeave={handleInputDefocus}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default KeybindItem;
