import { useSelector } from "react-redux";
import { Grid, TextField, Typography } from "@mui/material";
const { ipcRenderer } = window.require("electron");

const KeybindItem = ({ name, preferenceKey, changeKeybindHandler }) => {
  const userPreferences = useSelector((state) => state.ui.userPreferences);
  const keybind = userPreferences[preferenceKey] || "None";

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
      if (Object.values(userPreferences).includes(newKeybind)) return;
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
