import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";
import { createModal } from "react-modal-promise";
import { useState } from "react";
import { uiActions } from "../store/ui";
import { useDispatch, useSelector } from "react-redux";
import { saveModulePreferences } from "../utils/savePreferences";

const MuiDialog = ({ isOpen, onResolve, onReject, title, op1, op2 }) => {
  const { module } = useSelector((state) => state.dcsPoint);
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
      };
      dispatch(uiActions.setModulePreference(choice));
      saveModulePreferences(choice);
    }
    onResolve(option);
  };

  return (
    <Dialog open={isOpen} onClose={onReject}>
      {/* Center-aligned title */}
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
      <Stack>
        {/* Option buttons */}
        <Button onClick={() => handleOptionSelected(op1)}>{op1}</Button>
        <Button onClick={() => handleOptionSelected(op2)}>{op2}</Button>
        {/* Remember choice checkbox */}
        <FormGroup sx={{ alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberChoice}
                onChange={(e) => handleRememberChoice(e)}
              />
            }
            label="Remember this choice"
          />
        </FormGroup>
      </Stack>
    </Dialog>
  );
};

const SimpleDialog = ({ isOpen, onResolve, onReject, title, op1, op2 }) => {
  const handleOptionSelected = (option) => {
    onResolve(option);
  };

  return (
    <Dialog open={isOpen} onClose={onReject}>
      {/* Center-aligned title */}
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
      <Stack>
        {/* Option buttons */}
        <Button onClick={() => handleOptionSelected(op1)}>{op1}</Button>
        <Button onClick={() => handleOptionSelected(op2)}>{op2}</Button>
      </Stack>
    </Dialog>
  );
};

// Exporting the dialogs
export const TwoOptionsDialog = createModal(MuiDialog);
export const TwoOptionsSimpleDialog = createModal(SimpleDialog);


/*
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";
import { createModal } from "react-modal-promise";
import { useState } from "react";
import { uiActions } from "../store/ui";
import { useDispatch, useSelector } from "react-redux";
import { saveModulePreferences } from "../utils/savePreferences";
const MuiDialog = ({ isOpen, onResolve, onReject, title, op1, op2 }) => {
  const { module } = useSelector((state) => state.dcsPoint);
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
      };
      dispatch(uiActions.setModulePreference(choice));
      saveModulePreferences(choice);
    }
    onResolve(option);
  };
  return (
    <Dialog open={isOpen} onClose={onReject}>
      <DialogTitle>{title}</DialogTitle>
      <Stack>
        <Button onClick={() => handleOptionSelected(op1)}>{op1}</Button>
        <Button onClick={() => handleOptionSelected(op2)}>{op2}</Button>
        <FormGroup sx={{ alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberChoice}
                onChange={(e) => handleRememberChoice(e)}
              />
            }
            label="Remember this choice"
          />
        </FormGroup>
      </Stack>
    </Dialog>
  );
};

const SimpleDialog = ({ isOpen, onResolve, onReject, title, op1, op2 }) => {
  const handleOptionSelected = (option) => {
    onResolve(option);
  };

  return (
    <Dialog open={isOpen} onClose={onReject}>
      <DialogTitle>{title}</DialogTitle>
      <Stack>
        <Button onClick={() => handleOptionSelected(op1)}>{op1}</Button>
        <Button onClick={() => handleOptionSelected(op2)}>{op2}</Button>
      </Stack>
    </Dialog>
  );
};

export const TwoOptionsDialog = createModal(MuiDialog);
export const TwoOptionsSimpleDialog = createModal(SimpleDialog);
*/