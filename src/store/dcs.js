import { createSlice } from "@reduxjs/toolkit";

const initialState = { lat: null, long: null, elev: null };

const dcsSlice = createSlice({
  name: "dcs",
  initialState,
  reducers: {
    changeCoords(state, action) {
      // { "model": "F-16C_50", "coords": { "lat": "41.905925545347", "long": "43.783457188399"} , "elev": "1677.6647949219"}
      state.lat = action.payload.coords.lat;
      state.long = action.payload.coords.long;
      state.elev = action.payload.elev;
    },
  },
});

export const dcsActions = dcsSlice.actions;
export default dcsSlice.reducer;
