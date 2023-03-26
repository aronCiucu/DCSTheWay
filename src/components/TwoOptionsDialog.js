import { Button, Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";

const TwoOptionsDialog = (props) => {
  const [open, setOpen] = useState(false);
  let promises = {};
  const show = () => {
    return new Promise((resolve, reject) => {
      promises = { resolve, reject };
      setOpen(true);
    });
  };

  const closeHandler = () => {
    promises.reject();
  };

  const selectHander = (value) => {
    promises.resolve(value);
  };

  return (
    <Dialog open={props.isOpen} onClose={closeHandler}>
      <DialogTitle>{props.title}</DialogTitle>
      <Button onClick={() => selectHander(props.option1)}>
        {props.option1}
      </Button>
      <Button onClick={() => selectHander(props.option2)}>
        {props.option2}
      </Button>
    </Dialog>
  );
};

export default TwoOptionsDialog;
