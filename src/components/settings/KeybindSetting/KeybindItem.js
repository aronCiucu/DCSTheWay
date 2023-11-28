import { useSelector } from "react-redux";
import { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import KeybindDialog from "./KeybindDialog";

const KeybindItem = ({
  name,
  preferenceKey,
  defaultKey,
  changeKeybindHandler,
}) => {
  const userPreferences = useSelector((state) => state.ui.userPreferences);
  const keybind = userPreferences[preferenceKey] || defaultKey;
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <KeybindDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        keybind={keybind}
        changeKeybindHandler={changeKeybindHandler}
        preferenceKey={preferenceKey}
      />
      <Grid container sx={{ py: 0.5 }}>
        <Grid item xs={4}>
          <Typography variant="body2">{name}</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            size="small"
            InputProps={{
              readOnly: true,
            }}
            value={keybind}
            onClick={() => setDialogOpen(true)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default KeybindItem;
