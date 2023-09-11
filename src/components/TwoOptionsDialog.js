import {Button, Checkbox, Dialog, DialogTitle, FormControlLabel, FormGroup, Stack} from "@mui/material";
import {createModal} from "react-modal-promise";
import {useState} from "react";
import saveUserPreferences from "../utils/saveUserPreferences";
import {uiActions} from "../store/ui";
import {useDispatch, useSelector} from "react-redux";

const MuiDialog = ({isOpen, onResolve, onReject, title, op1, op2}) => {
    const {module} = useSelector((state) => state.dcsPoint);
    const [rememberChoice, setRememberChoice] = useState(false);
    const dispatch = useDispatch();
    const handleRememberChoice = (event) => {
        setRememberChoice(event.target.checked);
    };

    const handleOptionSelected = (option) => {
        if (rememberChoice) {
            const choice = {
                module,
                option,
            }
            dispatch(uiActions.setUserPreference(choice));
            saveUserPreferences(choice);
        }
        onResolve(option);
    }

    return (
        <Dialog open={isOpen} onClose={onReject}>
            <DialogTitle>{title}</DialogTitle>
            <Stack>
                <Button onClick={() => handleOptionSelected(op1)}>{op1}</Button>
                <Button onClick={() => handleOptionSelected(op2)}>{op2}</Button>
                <FormGroup sx={{alignItems: "center"}}>
                    <FormControlLabel control={
                        <Checkbox checked={rememberChoice}
                                  onChange={(e) => handleRememberChoice(e)}/>
                    } label="Remember this choice"/>
                </FormGroup>
            </Stack>
        </Dialog>
    );
};

export const TwoOptionsDialog = createModal(MuiDialog);
