import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Checkbox,
    Stack,
    FormGroup,
    FormControlLabel
} from "@mui/material";
import {createModal} from "react-modal-promise";
import {useState} from "react";
import saveUserPreferences from "../utils/saveUserPreferences";
import {uiActions} from "../store/ui";
import {useDispatch} from "react-redux";

const MuiDialog = ({isOpen, onResolve, onReject, title, content}) => {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setChecked(event.target.checked);
        dispatch(uiActions.setUserPreferences({hideDialogs: event.target.checked}));
        saveUserPreferences({hideDialogs: event.target.checked});
    };

    return (
        <Dialog open={isOpen} onClose={onReject}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Stack>
                    <DialogContentText>{content}</DialogContentText>
                    <Button fullWidth onClick={() => onResolve()}>Confirm</Button>
                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox checked={checked}
                                      onChange={handleChange} />
                        } label="Don't show again"/>
                    </FormGroup>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export const AlertDialog = createModal(MuiDialog);
