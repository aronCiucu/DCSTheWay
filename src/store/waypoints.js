import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";

const initialState = { dcsWaypoints: [], idCounter: 1 };

const waypointsSlice = createSlice({
  name: "waypoints",
  initialState,
  reducers: {
    addDcsWaypoint(state, action) {
      const payload = action.payload;

      state.dcsWaypoints.push({
        id: state.idCounter,
        name: `Waypoint ${state.idCounter}`,
        lat: payload.lat,
        long: payload.long,
        elev: payload.elev,
      });
      state.idCounter++;
    },
    changeName(state, action) {
      const index = state.dcsWaypoints.findIndex(
        (i) => i.id === action.payload.id,
      );
      state.dcsWaypoints[index]["name"] = action.payload.name;
    },
    changeElevation(state, action) {
      const index = state.dcsWaypoints.findIndex(
        (i) => i.id === action.payload.id,
      );
      state.dcsWaypoints[index]["elev"] = action.payload.elev;
    },
    delete(state, action) {
      const index = state.dcsWaypoints.findIndex(
        (i) => i.id === action.payload,
      );
      state.dcsWaypoints.splice(index, 1);
    },
    deleteAll(state) {
      state.dcsWaypoints = [];
      state.idCounter = 1;
    },
    deleteLast(state) {
      state.dcsWaypoints.pop();
    },
    changeOrder(state, action) {
      const oldIndex = state.dcsWaypoints.findIndex(
        (i) => i.id === action.payload.over,
      );
      const newIndex = state.dcsWaypoints.findIndex(
        (i) => i.id === action.payload.active,
      );
      state.dcsWaypoints = arrayMove(state.dcsWaypoints, newIndex, oldIndex);
    },
    appendWaypoints(state, action) {
      for (const waypoint of action.payload) {
        state.dcsWaypoints.push({
          id: state.idCounter,
          name: waypoint.name,
          lat: waypoint.lat,
          long: waypoint.long,
          elev: waypoint.elev,
        });
        state.idCounter++;
      }
    },
  },
});
export const waypointsActions = waypointsSlice.actions;
export default waypointsSlice.reducer;
