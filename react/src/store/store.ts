import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "../features/TaskSlice";
import UserSlice from "../features/UserSlice";
import ProjectSlice from "../features/ProjectSlice";
import EmployeeSlice from "../features/EmployeeSlice";
import DashboardSlice from "../features/DashboardSlice";

export const store = configureStore({
  reducer: {
    taskHandler: TaskSlice,
    user: UserSlice,
    projectHandler:ProjectSlice,
    employeeHandler:EmployeeSlice,
    dashboardHandler:DashboardSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
