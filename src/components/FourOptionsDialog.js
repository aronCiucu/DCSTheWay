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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui";
import { saveModulePreferences } from "../utils/savePreferences";

const { ipcRenderer } = window.require("electron");

/**
 * Four-option dialog WITH "Remember this choice"
 */
const FourDialog = ({
  isOpen,
  onResolve,
  onReject,
  title,
  op1,
  op2,
  op3,
  op4,
}) => {
  const { module } = useSelector((state) => state.dcsPoint);
  const [rememberChoice, setRememberChoice] = useState(false);
  const dispatch = useDispatch();

  const handleRememberChoice = (event) => {
    setRememberChoice(event.target.checked);
  };

  const handleOptionSelected = (option) => {
    // Ignore empty/undefined options (important when using this dialog for 2-3 options)
    if (!option) return;

    if (rememberChoice) {
      const choice = { module, option };
      dispatch(uiActions.setModulePreference(choice));
      saveModulePreferences(choice);
    }
    onResolve(option);
  };

  // NEW: listen for optionDialogSelect keybind events while this dialog is open
  useEffect(() => {
    if (!isOpen) return;

    const handler = (_event, which) => {
      switch (which) {
        case "op1":
          handleOptionSelected(op1);
          break;
        case "op2":
          handleOptionSelected(op2);
          break;
        case "op3":
          handleOptionSelected(op3);
          break;
        case "op4":
          handleOptionSelected(op4);
          break;
        default:
          break;
      }
    };

    ipcRenderer.on("optionDialogSelect", handler);
    return () => {
      ipcRenderer.removeListener("optionDialogSelect", handler);
    };
  }, [isOpen, op1, op2, op3, op4]); // (keep it simple: rebind if options change)

  return (
    <Dialog open={isOpen} onClose={onReject}>
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
      <Stack>
        {[op1, op2, op3, op4]
  .filter(Boolean)
  .map((op) => (
    <Button key={op} onClick={() => handleOptionSelected(op)}>
      {op}
    </Button>
  ))}


        <FormGroup sx={{ alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox checked={rememberChoice} onChange={handleRememberChoice} />
            }
            label="Remember this choice"
          />
        </FormGroup>
      </Stack>
    </Dialog>
  );
};

/**
 * Four-option dialog WITHOUT remembering (simple / transient)
 */
const FourSimpleDialog = ({
  isOpen,
  onResolve,
  onReject,
  title,
  op1,
  op2,
  op3,
  op4,
}) => {
  const handleOptionSelected = (option) => {
    if (!option) return;
    onResolve(option);
  };

  // NEW: listen for optionDialogSelect keybind events while this dialog is open
  useEffect(() => {
    if (!isOpen) return;

    const handler = (_event, which) => {
      switch (which) {
        case "op1":
          handleOptionSelected(op1);
          break;
        case "op2":
          handleOptionSelected(op2);
          break;
        case "op3":
          handleOptionSelected(op3);
          break;
        case "op4":
          handleOptionSelected(op4);
          break;
        default:
          break;
      }
    };

    ipcRenderer.on("optionDialogSelect", handler);
    return () => {
      ipcRenderer.removeListener("optionDialogSelect", handler);
    };
  }, [isOpen, op1, op2, op3, op4]);

  return (
    <Dialog open={isOpen} onClose={onReject}>
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
      <Stack>
        {[op1, op2, op3, op4]
  .filter(Boolean)
  .map((op) => (
    <Button key={op} onClick={() => handleOptionSelected(op)}>
      {op}
    </Button>
  ))}

      </Stack>
    </Dialog>
  );
};

// Exports
export const FourOptionsDialog = createModal(FourDialog);
export const FourOptionsSimpleDialog = createModal(FourSimpleDialog);
