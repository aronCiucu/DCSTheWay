import { Box, Slider, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ButtonDelaySetting = ({ settingChangeHandler }) => {
  const userPreferences = useSelector((state) => state.ui.userPreferences);

  return (
    <Stack direction={"column"}>
      <Typography id="input-slider" gutterBottom>
        Button press delay
      </Typography>
      <Typography variant="caption">
        Try increasing this if buttons are pressing incorrectly, or too quickly.
      </Typography>
      <Box sx={{ width: "100%", px: 2 }}>
        <Slider
          size="small"
          marks={[
            { value: 0, label: "+0ms" },
            { value: 100, label: "+100ms" },
          ]}
          step={10}
          min={0}
          max={100}
          defaultValue={userPreferences["buttonDelay"]}
          valueLabelFormat={(value) => `+${value}ms`}
          valueLabelDisplay="auto"
          aria-labelledby="input-slider"
          onChangeCommitted={(e, v) => settingChangeHandler("buttonDelay", v)}
        />
      </Box>
    </Stack>
  );
};

export default ButtonDelaySetting;
