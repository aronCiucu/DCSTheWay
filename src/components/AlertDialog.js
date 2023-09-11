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
import {useDispatch, useSelector} from "react-redux";

const MuiDialog = ({isOpen, onResolve, onReject, title, content}) => {
    const {module} = useSelector((state) => state.dcsPoint);
    const [dontShow, setDontShow] = useState(false);
    const dispatch = useDispatch();
    const handleDontShow = (event) => {
        setDontShow(event.target.checked);
    }

    const handleConfirm = () => {
        if (dontShow) {
            const choice = {
                module,
                option: "Hide",
            }
            dispatch(uiActions.setUserPreference(choice));
            saveUserPreferences(choice);
        }
        onResolve();
    }

    return (
        <Dialog open={isOpen} onClose={onReject}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Stack>
                    <DialogContentText>{content}</DialogContentText>
                    <Button fullWidth onClick={handleConfirm}>Confirm</Button>
                    <FormGroup sx={{alignItems: "center"}}>
                        <FormControlLabel control={
                            <Checkbox checked={dontShow}
                                      onChange={(e) => handleDontShow(e)} />
                        } label="Don't show again"/>
                    </FormGroup>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export const AlertDialog = createModal(MuiDialog);
