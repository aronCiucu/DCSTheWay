import {Button, Checkbox, Dialog, DialogTitle, FormControlLabel, FormGroup, Stack} from "@mui/material";
import {createModal} from "react-modal-promise";
import {useState} from "react";
import saveUserPreferences from "../utils/saveUserPreferences";
import {uiActions} from "../store/ui";
import {useDispatch} from "react-redux";

const MuiDialog = ({isOpen, onResolve, onReject, title, op1, op2}) => {
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
            <Stack>
                <Button onClick={() => onResolve(op1)}>{op1}</Button>
                <Button onClick={() => onResolve(op2)}>{op2}</Button>
                <FormGroup>
                    <FormControlLabel control={
                        <Checkbox checked={checked}
                                  onChange={handleChange}/>
                    } label="Remember my choice"/> <div>{/* Clearer and more applicable across the application IMO */}</div>
                </FormGroup>
            </Stack>
        </Dialog>
    );
};

export const TwoOptionsDialog = createModal(MuiDialog);
