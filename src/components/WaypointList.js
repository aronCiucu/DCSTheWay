import { Card, List } from "@mui/material";
import WaypointItem from "./WaypointItem";
import { useDispatch, useSelector } from "react-redux";
import { waypointsActions } from "../store/waypoints";
import Convertors from "../utils/Convertors";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useId, useState } from "react";

const WaypointList = () => {
  const isPending = useSelector((state) => state.ui.pendingWaypoint);
  const { lat, long, elev, module } = useSelector((state) => state.dcsPoint);
  const dcsWaypoints = useSelector((state) => state.waypoints.dcsWaypoints);
  const dispatch = useDispatch();

  const selectModuleCoordinates = () => {
    switch (module) {
      case "F-16C_50": {
        let f16waypoints = [];
        for (const dcsWaypoint of dcsWaypoints) {
          const name = dcsWaypoint.name;
          const id = dcsWaypoint.id;
          const dmmLat = Convertors.decimalToDMM(dcsWaypoint.lat);
          const dmmLong = Convertors.decimalToDMM(dcsWaypoint.long);
          const f16Lat =
            dmmLat.deg.toString().padStart(2, "0") +
            "." +
            dmmLat.min.toFixed(3).toString().padStart(6, "0");
          const f16Long =
            dmmLong.deg.toString().padStart(3, "0") +
            "." +
            dmmLong.min.toFixed(3).toString().padStart(6, "0");
          const f16Elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev));
          const f16LatHem = dcsWaypoint.lat > 0 ? "N" : "S";
          const f16LongHem = dcsWaypoint.long > 0 ? "E" : "W";
          f16waypoints.push({
            name,
            id,
            lat: f16Lat,
            long: f16Long,
            elev: f16Elev,
            latHem: f16LatHem,
            longHem: f16LongHem,
          });
        }
        return f16waypoints;
      }
      case "AH-64D_BLK_II": {
        let ah64Waypoints = [];
        for (const dcsWaypoint of dcsWaypoints) {
          const name = dcsWaypoint.name;
          const id = dcsWaypoint.id;
          const dmmLat = Convertors.decimalToDMM(dcsWaypoint.lat);
          const dmmLong = Convertors.decimalToDMM(dcsWaypoint.long);
          const ah64Lat =
            dmmLat.deg.toString().padStart(2, "0") +
            "." +
            dmmLat.min.toFixed(2).toString().padStart(5, "0");
          const ah64Long =
            dmmLong.deg.toString().padStart(3, "0") +
            "." +
            dmmLong.min.toFixed(2).toString().padStart(5, "0");
          const ah64Elev = Math.trunc(Convertors.mToF(dcsWaypoint.elev));
          const ah64LatHem = dcsWaypoint.lat > 0 ? "N" : "S";
          const ah64LongHem = dcsWaypoint.long > 0 ? "E" : "W";
          ah64Waypoints.push({
            name,
            id,
            lat: ah64Lat,
            long: ah64Long,
            elev: ah64Elev,
            latHem: ah64LatHem,
            longHem: ah64LongHem,
          });
        }
        return ah64Waypoints;
      }
      default:
        return [];
    }
  };

  const saveWaypointHandler = () => {
    dispatch(
      waypointsActions.addDcsWaypoint({
        lat,
        long,
        elev,
      })
    );
  };
  const deleteHandler = (event, id) => {
    dispatch(waypointsActions.delete(id));
  };

  const renameHandler = (event, id) => {
    const name = event.target.value;
    if (name.length > 0) dispatch(waypointsActions.changeName({ id, name }));
  };

  const elevationHandler = (event, id) => {
    const elev = Convertors.fToM(event.target.value);
    dispatch(waypointsActions.changeElevation({ id, elev }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      dispatch(
        waypointsActions.changeOrder({ active: active.id, over: over.id })
      );
    }
  };

  return (
    <Card sx={{ borderRadius: "10px", height: "100%" }}>
      <List style={{ maxHeight: "100%", overflow: "auto", padding: 0 }}>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={selectModuleCoordinates()}
            strategy={verticalListSortingStrategy}
          >
            {selectModuleCoordinates().map((wp) => (
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
                onRename={renameHandler}
                onElevation={elevationHandler}
                onDelete={deleteHandler}
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
          </SortableContext>
        </DndContext>
      </List>
    </Card>
  );
};

export default WaypointList;
