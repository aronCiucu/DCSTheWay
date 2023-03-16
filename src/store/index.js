import { configureStore } from "@reduxjs/toolkit";
import dcsReducer from "./dcs";
import uiReducer from "./ui";
import waypointsReducer from "./waypoints";

const index = configureStore({
  reducer: {
    dcs: dcsReducer,
    ui: uiReducer,
    waypoints: waypointsReducer,
  },
});

export default index;
