import { createSlice } from "@reduxjs/toolkit";

const initialState = { module: null, lat: null, long: null, elev: null, busy: null };

const dcsPointSlice = createSlice({
  name: "dcsPoint",
  initialState,
  reducers: {
    changeCoords(state, action) {
      // { "model": "F-16C_50", "coords": { "lat": "41.905925545347", "long": "43.783457188399"} , "elev": "1677.6647949219", "busy": false}
      state.module = action.payload.model;
      state.lat = Number(action.payload.coords.lat);
      state.long = Number(action.payload.coords.long);
      state.elev = Number(action.payload.elev);
      state.busy = action.payload.busy;
    },
  },
});

export const dcsPointActions = dcsPointSlice.actions;
export default dcsPointSlice.reducer;