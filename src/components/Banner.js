import { Typography } from "@mui/material";
import "./Banner.css";

const Banner = (props) => {
  return (
    <>
      <Typography
        color="lightgrey"
        variant="overline"
        sx={{ paddingLeft: 2, paddingTop: 1 }}
        className="overlay-text-container"
      >
        {props.text}
      </Typography>
      <img
        alt="module-image"
        className="image-container"
        src={props.imagePath}
        draggable="false"
      />
    </>
  );
};

export default Banner;
