import { createSlice } from "@reduxjs/toolkit";

const initialState = { pendingWaypoint: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changePendingWaypoint(state, action) {
      state.pendingWaypoint = action.payload;
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
