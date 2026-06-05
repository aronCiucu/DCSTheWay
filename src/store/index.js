import { configureStore } from "@reduxjs/toolkit";
import dcsReducer from "./dcsPoint";
import uiReducer from "./ui";
import waypointsReducer from "./waypoints";

const index = configureStore({
  reducer: {
    dcsPoint: dcsReducer,
    ui: uiReducer,
    waypoints: waypointsReducer,
  },
});

export default index;
