import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const AlwaysOnTopSetting = ({ settingChangeHandler }) => {
  const userPreferences = useSelector((state) => state.ui.userPreferences);

  return (
    <Stack direction={"column"}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={userPreferences["alwaysOnTop"] !== false}
              onChange={(e) =>
                settingChangeHandler("alwaysOnTop", e.target.checked)
              }
            />
          }
          label={"Always on top"}
        />
      </FormGroup>
    </Stack>
  );
};

export default AlwaysOnTopSetting;
