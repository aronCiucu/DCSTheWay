import { Card } from "@mui/material";

const Error = (props) => {
  return (
    <Card sx={{ backgroundColor: "darkred", borderRadius: "10px", padding: 1 }}>
      { props.error }
    </Card>
  );
};

export default Error;
