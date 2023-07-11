import {Button, Checkbox, Dialog, DialogTitle, FormControlLabel, FormGroup, Stack} from "@mui/material";
import {createModal} from "react-modal-promise";
import {useState} from "react";
import saveUserPreferences from "../utils/saveUserPreferences";

const MuiDialog = ({isOpen, onResolve, onReject, title, op1, op2}) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
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
                    } label="Assume pilot slot from now"/>
                </FormGroup>
            </Stack>
        </Dialog>
    );
};

export const TwoOptionsDialog = createModal(MuiDialog);
