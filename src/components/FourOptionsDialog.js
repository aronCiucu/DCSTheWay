import {
    Button,
    Dialog,
    DialogTitle,
    Stack,
  } from "@mui/material";
  import { createModal } from "react-modal-promise";
  
  const FourSimpleDialog = ({ isOpen, onResolve, onReject, title, op1, op2, op3, op4 }) => {
    const handleOptionSelected = (option) => {
      onResolve(option);
    };
  
    return (
      <Dialog open={isOpen} onClose={onReject}>
        <DialogTitle>{title}</DialogTitle>
        <Stack>
          <Button onClick={() => handleOptionSelected(op1)}>{op1}</Button>
          <Button onClick={() => handleOptionSelected(op2)}>{op2}</Button>
          <Button onClick={() => handleOptionSelected(op3)}>{op3}</Button>
          <Button onClick={() => handleOptionSelected(op4)}>{op4}</Button>
        </Stack>
      </Dialog>
    );
  };
  
  export const FourOptionsSimpleDialog = createModal(FourSimpleDialog);
  