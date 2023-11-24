import { Box, Button, Card, List, Typography } from "@mui/material";
import WaypointItem from "./WaypointItem";
import { useDispatch, useSelector } from "react-redux";
import { waypointsActions } from "../store/waypoints";
import Convertors from "../utils/Convertors";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ConvertModuleWaypoints from "../utils/ConvertModuleWaypoints";
import { useEffect, useRef, useState } from "react";

const WaypointList = () => {
  const isPending = useSelector((state) => state.ui.pendingWaypoint);
  const { lat, long, elev, module } = useSelector((state) => state.dcsPoint);
  const dcsWaypoints = useSelector((state) => state.waypoints.dcsWaypoints);
  const dispatch = useDispatch();
  const [expandedWaypointId, setExpandedWaypointId] = useState(-1);

  const moduleCoordinates = ConvertModuleWaypoints(dcsWaypoints, module);
  const hasWaypoints = dcsWaypoints.length > 0;
  const ref = useRef(null);
  useEffect(() => {
    if (dcsWaypoints.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [dcsWaypoints.length]);

  const saveWaypointHandler = () => {
    dispatch(
      waypointsActions.addDcsWaypoint({
        lat,
        long,
        elev,
      }),
    );
  };
  const deleteHandler = (event, id) => {
    dispatch(waypointsActions.delete(id));
  };

  const deleteAllHandler = () => dispatch(waypointsActions.deleteAll());

  const renameHandler = (event, id) => {
    const name = event.target.value;
    if (name.length > 0) dispatch(waypointsActions.changeName({ id, name }));
  };

  const elevationHandler = (event, id) => {
    const elev = Convertors.fToM(event.target.value);
    dispatch(waypointsActions.changeElevation({ id, elev }));
  };

  const expandHandler = (id, isExpanded) => {
    isExpanded ? setExpandedWaypointId(id) : setExpandedWaypointId(-1);
  };

  const checkIfExpanded = (id) => expandedWaypointId === id;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      dispatch(
        waypointsActions.changeOrder({ active: active.id, over: over.id }),
      );
    }
  };

  return (
    <Card sx={{ borderRadius: "10px", height: "100%" }}>
      <List
        style={{
          maxHeight: "100%",
          height: "100%",
          overflow: "auto",
          padding: 0,
        }}
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[
            restrictToVerticalAxis,
            restrictToParentElement,
            restrictToFirstScrollableAncestor,
          ]}
        >
          <SortableContext
            items={moduleCoordinates}
            strategy={verticalListSortingStrategy}
          >
            {hasWaypoints || isPending ? (
              <>
                {moduleCoordinates.map((wp) => (
                  <WaypointItem
                    key={wp.id}
                    id={wp.id}
                    pending={false}
                    name={wp.name}
                    lat={wp.lat}
                    long={wp.long}
                    elev={wp.elev}
                    latHem={wp.latHem}
                    longHem={wp.longHem}
                    expanded={checkIfExpanded(wp.id)}
                    onRename={renameHandler}
                    onElevation={elevationHandler}
                    onDelete={deleteHandler}
                    onExpand={expandHandler}
                  />
                ))}

                {isPending && (
                  <WaypointItem
                    pending={true}
                    name={"New Waypoint"}
                    lat={null}
                    long={null}
                    elev={null}
                    latHem={null}
                    longHem={null}
                    onSave={saveWaypointHandler}
                  />
                )}
              </>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="overline"
                  color="grey"
                  style={{ userSelect: "none" }}
                >
                  No waypoints selected...
                </Typography>
              </Box>
            )}
          </SortableContext>
        </DndContext>
        {hasWaypoints && (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Button variant="text" size="small" onClick={deleteAllHandler}>
              Clear All
            </Button>
          </Box>
        )}
        <div ref={ref} />
      </List>
    </Card>
  );
};

export default WaypointList;
