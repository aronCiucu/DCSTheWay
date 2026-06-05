import { green, grey, red } from "@mui/material/colors";

const theWayTheme = {
  palette: {
    mode: "dark",
    primary: green,
    secondary: red,
    neutral: { main: grey[800] },
    background: {
      default: grey[900],
      paper: grey[900],
    },
  },
  typography: {
    fontSize: 12,
  },
  // spacing: 6,
};

export default theWayTheme;
