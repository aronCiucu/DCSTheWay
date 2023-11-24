import { Box, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import SettingsIcon from "@mui/icons-material/Settings";

import "./TitleBar.css";

const { ipcRenderer } = window.require("electron");
const TitleBar = ({ openSettingsHandler }) => {
  const minimizeHandler = () => {
    ipcRenderer.send("minimize");
  };
  const closeHandler = () => {
    ipcRenderer.send("close");
  };

  return (
    <Box className="parent">
      <Box className="buttons">
        <Tooltip title="Settings" enterNextDelay={100}>
          <IconButton onClick={openSettingsHandler}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Minimize" enterNextDelay={100}>
          <IconButton onClick={minimizeHandler}>
            <MinimizeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Close" enterNextDelay={100}>
          <IconButton onClick={closeHandler}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TitleBar;
