import { Box, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import SettingsIcon from "@mui/icons-material/Settings";

import "./TitleBar.css";

const { ipcRenderer } = window.require("electron");

const iconButtonSx = {
  color: "white",
  "& svg": {
    filter: `
      drop-shadow(-1px 0 0 rgba(0,0,0,0.9))
      drop-shadow(1px 0 0 rgba(0,0,0,0.9))
      drop-shadow(0 -1px 0 rgba(0,0,0,0.9))
      drop-shadow(0 1px 0 rgba(0,0,0,0.9))
    `,
  },
};

const TitleBar = ({ openSettingsHandler }) => {
  const minimizeHandler = (e) => {
    ipcRenderer.send("minimize", { shift: e.shiftKey });
  };

  const closeHandler = () => {
    ipcRenderer.send("close");
  };

  return (
    <Box className="parent">
      <Box className="buttons">
        <Tooltip title="Settings" enterNextDelay={100}>
          <IconButton onClick={openSettingsHandler} sx={iconButtonSx}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Hide (Shift: collapse)" enterNextDelay={100}>
          <IconButton onClick={minimizeHandler} sx={iconButtonSx}>
            <MinimizeIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Close" enterNextDelay={100}>
          <IconButton onClick={closeHandler} sx={iconButtonSx}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TitleBar;
