import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";

import "./TitleBar.css";
const { ipcRenderer } = window.require("electron");
const TitleBar = () => {
  const minimizeHandler = () => {
    ipcRenderer.send("minimize");
  };
  const closeHandler = () => {
    ipcRenderer.send("close");
  };

  return (
    <Box className="parent">
      <Box className="buttons">
        <IconButton onClick={minimizeHandler}>
          <MinimizeIcon />
        </IconButton>
        <IconButton onClick={closeHandler}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TitleBar;
