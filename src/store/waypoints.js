import { createSlice } from "@reduxjs/toolkit";
import Convertors from "../utils/Convertors";

const initialState = { dcsWaypoints: [], moduleWaypoints: [] };

const waypointsSlice = createSlice({
  name: "waypoints",
  initialState,
  reducers: {
    addDcsWaypoint(state, action) {
      const payload = action.payload;

      state.dcsWaypoints.push({
        name: payload.name,
        lat: payload.lat,
        long: payload.long,
        elev: payload.elev,
      });
    },
    convertWaypoints(state, action) {
      const module = action.payload;
      switch (module) {
        case "F-16C_50": {
          state.moduleWaypoints = [];
          for (const dcsWaypoint of state.dcsWaypoints) {
            const name = dcsWaypoint.name;
            const dmmLat = Convertors.decimalToDMM(dcsWaypoint.lat);
            const dmmLong = Convertors.decimalToDMM(dcsWaypoint.long);
            console.log(dmmLat.min);
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
            state.moduleWaypoints.push({
              name,
              lat: f16Lat,
              long: f16Long,
              elev: f16Elev,
              latHem: f16LatHem,
              longHem: f16LongHem,
            });
          }
          break;
        }
      }
    },
  },
});
export const addAndConvert = (waypoint) => {
  return (dispatch, getState) => {
    const { dcsPoint } = getState();
    const module = dcsPoint.module;

    dispatch(waypointsSlice.actions.addDcsWaypoint(waypoint));
    dispatch(waypointsSlice.actions.convertWaypoints(module));
  };
};
export const waypointsActions = waypointsSlice.actions;
export default waypointsSlice.reducer;
