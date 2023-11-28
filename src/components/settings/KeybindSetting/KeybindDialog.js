import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const { ipcRenderer } = window.require("electron");

const KeybindDialog = ({
  open,
  setOpen,
  keybind,
  changeKeybindHandler,
  preferenceKey,
}) => {
  const handleInputFocus = () => {
    ipcRenderer.send("focus");
  };
  const handleInputDefocus = (event) => {
    ipcRenderer.send("defocus");
    event.target.blur();
  };

  const handleKeyPress = (event) => {
    console.log(event);
    if (event.key === "Delete") {
      changeKeybindHandler(preferenceKey, "None");
    }
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, pb: 0 }}>Change Keybind</DialogTitle>
      <IconButton
        onClick={() => setOpen(false)}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value={keybind}
          onMouseEnter={handleInputFocus}
          onMouseLeave={handleInputDefocus}
          onKeyDown={handleKeyPress}
        />
        <Typography variant="caption">
          To assign a new bind, click the box above and press the desired
          keybind, or DEL to remove the bind.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default KeybindDialog;
