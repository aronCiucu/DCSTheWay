import {Stack, Typography} from "@mui/material";
import "./Banner.css";

const Banner = (props) => {
  return (
    <>
      <Stack className="overlay-text-container"
        sx={{paddingLeft: 2, paddingTop: 1}}
      >
        <Typography
          variant="overline"
          sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)' }}
        >
          TheWay V{process.env.REACT_APP_VERSION}
        </Typography>
        <Typography
          color="lightgrey"
          variant="overline"
          sx={{ lineHeight: 'normal' }}
        >
          {props.text}
        </Typography>
      </Stack>
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
