import { Button, Dialog, DialogTitle } from "@mui/material";
import { createModal } from "react-modal-promise";

const muiDialog = ({ isOpen, onResolve, onReject, title, op1, op2 }) => {
  return (
    <Dialog open={isOpen} onClose={onReject}>
      <DialogTitle>{title}</DialogTitle>
      <Button onClick={() => onResolve(op1)}>{op1}</Button>
      <Button onClick={() => onResolve(op2)}>{op2}</Button>
    </Dialog>
  );
};

export const TwoOptionsDialog = createModal(muiDialog);
