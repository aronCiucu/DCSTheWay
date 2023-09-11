import { createSlice } from "@reduxjs/toolkit";

const initialState = { pendingWaypoint: false, userPreferences: {} };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changePendingWaypoint(state, action) {
      state.pendingWaypoint = action.payload;
    },
    setUserPreference(state, action) {
      const preference = action.payload;
      const {module, option} = preference;
      state.userPreferences[module]
          ? state.userPreferences[module].push(option)
          : state.userPreferences[module] = [option];
    },
    setUserPreferences(state, action) {
      state.userPreferences = action.payload;
    }
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
