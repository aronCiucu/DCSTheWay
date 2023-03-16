import { createSlice } from "@reduxjs/toolkit";

const initialState = { waypointList: [] };

const waypointsSlice = createSlice({
  name: "waypoints",
  initialState,
  reducers: {
    addWaypoint(state, action) {
      const payload = action.payload;

      state.waypointList.push({
        name: payload.name,
        lat: payload.lat,
        long: payload.long,
        elev: payload.elev,
      });
    },
  },
});

export const waypointsActions = waypointsSlice.actions;
export default waypointsSlice.reducer;
