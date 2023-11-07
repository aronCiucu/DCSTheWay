import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Slider,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SettingsDialog = ({open, closeHandler}) => {
    return (
        <Dialog open={open} fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, pb: 0 }}>
                Settings
            </DialogTitle>
            <IconButton
                onClick={closeHandler}
                sx={{position: 'absolute', right: 8, top: 8}}
            >
                <CloseIcon/>
            </IconButton>
            <DialogContent>
                <DialogContentText>
                    Additional button press delay (increase this if button presses are too quick)
                </DialogContentText>
                <Slider
                    marks={[{value: 0, label: '+0ms'}, {value: 100, label: '+100ms'},]}
                    step={10}
                    min={0}
                    max={100}
                    defaultValue={30}
                    getAriaValueText={(value) => (`+ ${value}ms`)}
                    valueLabelDisplay="auto"
                    aria-label="Button press delay"
                />
            </DialogContent>
        </Dialog>
    );
}

export default SettingsDialog;
