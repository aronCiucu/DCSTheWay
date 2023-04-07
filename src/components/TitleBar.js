import { Box, IconButton, Tooltip } from "@mui/material";
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
        <Tooltip title="Minimize">
          <IconButton onClick={minimizeHandler}>
            <MinimizeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Close">
          <IconButton onClick={closeHandler}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TitleBar;
