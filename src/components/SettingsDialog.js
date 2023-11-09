import {
    Box,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    FormGroup,
    IconButton,
    List,
    ListItem,
    Slider,
    Stack,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { uiActions } from "../store/ui";
import { saveSettingsPreferences } from "../utils/savePreferences";
import { useDispatch, useSelector } from "react-redux";

const SettingsDialog = ({ open, closeHandler }) => {
    const dispatch = useDispatch();
    const userPreferences = useSelector((state) => state.ui.userPreferences);
    const settingChangeHandler = (settingName, newValue) => {
        const setting = {
            key: settingName,
            value: newValue,
        };
        dispatch(uiActions.setSettingsPreference(setting));
        saveSettingsPreferences(setting);
    };

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, pb: 0 }}>Settings</DialogTitle>
            <IconButton
                onClick={closeHandler}
                sx={{ position: "absolute", right: 8, top: 8 }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <List sx={{ py: 0 }}>
                    <ListItem sx={{ px: 0 }}>
                        <Stack direction={"column"}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                userPreferences["alwaysOnTop"]
                                            }
                                            onChange={(e) =>
                                                settingChangeHandler(
                                                    "alwaysOnTop",
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    }
                                    label={"Always on top"}
                                />
                            </FormGroup>
                            <Typography variant="caption">
                                Takes effect on restart.
                            </Typography>
                        </Stack>
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ px: 0 }}>
                        <Stack direction={"column"}>
                            <Typography id="input-slider" gutterBottom>
                                Button press delay
                            </Typography>
                            <Typography variant="caption">
                                Increase this if buttons are pressing
                                incorrectly.
                            </Typography>
                            <Box sx={{ width: "100%", px: 2 }}>
                                <Slider
                                    size="small"
                                    marks={[
                                        { value: 0, label: "+0ms" },
                                        { value: 100, label: "+100ms" },
                                    ]}
                                    step={10}
                                    min={0}
                                    max={100}
                                    defaultValue={
                                        userPreferences["buttonDelay"]
                                    }
                                    valueLabelFormat={(value) => `+${value}ms`}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="input-slider"
                                    onChangeCommitted={(e, v) =>
                                        settingChangeHandler("buttonDelay", v)
                                    }
                                />
                            </Box>
                        </Stack>
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ px: 0 }}>
                        <Typography id="crosshair-color" gutterBottom>
                            Crosshair color
                        </Typography>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;
