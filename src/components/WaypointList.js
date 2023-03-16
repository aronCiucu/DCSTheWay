import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import WaypointItem from "./WaypointItem";
import { useDispatch, useSelector } from "react-redux";
import { waypointsActions } from "../store/waypoints";

const WaypointList = () => {
  const isPending = useSelector((state) => state.ui.pendingWaypoint);
  const { lat, long, elev } = useSelector((state) => state.dcs);
  const waypoints = useSelector((state) => state.waypoints.waypointList);

  const dispatch = useDispatch();
  const saveWaypointHandler = () => {
    dispatch(
      waypointsActions.addWaypoint({
        name: `Waypoint ${waypoints.length + 1}`,
        lat,
        long,
        elev,
      })
    );
  };

  return (
    <Card sx={{ borderRadius: "10px" }}>
      {waypoints.map((wp) => (
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
          name={`Waypoint ${waypoints.length + 1}`}
          lat={null}
          long={null}
          elev={null}
          onSave={saveWaypointHandler}
        />
      )}
    </Card>
  );
};

export default WaypointList;
