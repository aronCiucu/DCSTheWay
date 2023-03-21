import { createSlice } from "@reduxjs/toolkit";

const initialState = { dcsWaypoints: [] };

const waypointsSlice = createSlice({
  name: "waypoints",
  initialState,
  reducers: {
    addDcsWaypoint(state, action) {
      const payload = action.payload;

      state.dcsWaypoints.push({
        id: payload.id,
        name: payload.name,
        lat: payload.lat,
        long: payload.long,
        elev: payload.elev,
      });
    },
    changeName(state, action) {
      const index = state.dcsWaypoints.findIndex(
        (i) => i.id === action.payload.id
      );
      state.dcsWaypoints[index]["name"] = action.payload.name;
    },
    changeElevation(state, action) {
      const index = state.dcsWaypoints.findIndex(
        (i) => i.id === action.payload.id
      );
      state.dcsWaypoints[index]["elev"] = action.payload.elev;
    },
    delete(state, action) {
      const index = state.dcsWaypoints.findIndex(
        (i) => i.id === action.payload
      );
      state.dcsWaypoints.splice(index, 1);
    },
  },
});
export const waypointsActions = waypointsSlice.actions;
export default waypointsSlice.reducer;
