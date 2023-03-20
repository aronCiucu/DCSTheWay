import { Card, List } from "@mui/material";
import WaypointItem from "./WaypointItem";
import { useDispatch, useSelector } from "react-redux";
import { addAndConvert } from "../store/waypoints";

const WaypointList = () => {
  const isPending = useSelector((state) => state.ui.pendingWaypoint);
  const { lat, long, elev } = useSelector((state) => state.dcsPoint);
  const moduleWaypoints = useSelector(
    (state) => state.waypoints.moduleWaypoints
  );

  const dispatch = useDispatch();

  const saveWaypointHandler = () => {
    dispatch(
      addAndConvert({
        name: `Waypoint ${moduleWaypoints.length + 1}`,
        lat,
        long,
        elev,
      })
    );
  };

  return (
    <Card sx={{ borderRadius: "10px", height: "100%" }}>
      <List style={{ maxHeight: "100%", overflow: "auto", padding: 0 }}>
        {moduleWaypoints.map((wp) => (
          <WaypointItem
            key={wp.name}
            pending={false}
            name={wp.name}
            lat={wp.lat}
            long={wp.long}
            elev={wp.elev}
          />
        ))}

        {isPending && (
          <WaypointItem
            pending={true}
            name={`Waypoint ${moduleWaypoints.length + 1}`}
            lat={null}
            long={null}
            elev={null}
            onSave={saveWaypointHandler}
          />
        )}
      </List>
    </Card>
  );
};

export default WaypointList;
