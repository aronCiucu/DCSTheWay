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
    const key = event.key;
    if (key === "Shift" || key === "Control" || key === "Alt") return;
    if (key === "Delete") {
      changeKeybindHandler(preferenceKey, "None");
    } else {
      const ctrl = event.ctrlKey ? "CTRL+" : "";
      const shift = event.shiftKey ? "SHIFT+" : "";
      const alt = event.altKey ? "ALT+" : "";
      const newKeybind = ctrl + shift + alt + key.toUpperCase();
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
