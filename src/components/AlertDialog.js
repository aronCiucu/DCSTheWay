import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { createModal } from "react-modal-promise";

const muiDialog = ({ isOpen, onResolve, onReject, title, content }) => {
  return (
    <Dialog open={isOpen} onClose={onReject}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        <Button onClick={() => onResolve()}>Confirm</Button>
      </DialogContent>
    </Dialog>
  );
};

export const AlertDialog = createModal(muiDialog);
