import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "../apis/taskApi";

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(taskApi.middleware),
});
