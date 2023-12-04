import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { uiActions } from "../../store/ui";
import { saveSettingsPreferences } from "../../utils/savePreferences";
import { useDispatch } from "react-redux";
import AlwaysOnTopSetting from "./AlwaysOnTopSetting";
import ButtonDelaySetting from "./ButtonDelaySetting";
import CrosshairSetting from "./CrosshairSetting";
import KeybindSetting from "./KeybindSetting/KeybindSetting";

const SettingsDialog = ({ open, closeHandler }) => {
  const dispatch = useDispatch();
  const settingChangeHandler = (
    settingName,
    newValue,
    applyImmediately = true,
  ) => {
    const setting = {
      key: settingName,
      value: newValue,
      apply: applyImmediately,
    };
    dispatch(uiActions.setSettingsPreference(setting));
    saveSettingsPreferences(setting);
  };

  return (
    <Dialog open={open} fullWidth sx={{ m: -2 }}>
      <DialogTitle sx={{ m: 0, p: 2, pb: 0 }}>Settings</DialogTitle>
      <IconButton
        onClick={closeHandler}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: 0 }}>
        <List sx={{ py: 0 }}>
          <ListItem sx={{ px: 0, pt: 2 }}>
            <AlwaysOnTopSetting settingChangeHandler={settingChangeHandler} />
          </ListItem>
          <Divider />
          <ListItem sx={{ px: 0, pt: 2 }}>
            <KeybindSetting settingChangeHandler={settingChangeHandler} />
          </ListItem>
          <Divider />
          <ListItem sx={{ px: 0, pt: 2 }}>
            <CrosshairSetting settingChangeHandler={settingChangeHandler} />
          </ListItem>
          <Divider />
          <ListItem sx={{ px: 0, pt: 2 }}>
            <ButtonDelaySetting settingChangeHandler={settingChangeHandler} />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
