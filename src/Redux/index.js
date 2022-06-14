import { configureStore } from "@reduxjs/toolkit";
import projecSlice from "./projectSlice";

export default configureStore({
  reducer: {
    project: projecSlice,
  },
});
