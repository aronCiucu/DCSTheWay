import { green, grey, red } from "@mui/material/colors";

const theWayTheme = {
  palette: {
    mode: "dark",
    primary: green,
    secondary: red,
    background: {
      default: grey[900],
      paper: grey[850],
    },
  },
  typography: {
    fontSize: 12,
  },
  spacing: 6,
};

export default theWayTheme;
