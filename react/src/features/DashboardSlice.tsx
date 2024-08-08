import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axiosClient from "../axios"
import { setStatusMessage } from "./TaskSlice"


interface ProjectProgressProps {
  categories:[],
  failed:[],
  in_progress:[],
  delivered:[]
}
interface ProjectStatusProps {
  failed:[],
  in_progress:[],
  delivered:[]
}
interface NotificationProps{

    id:number,
    data:{message:string},
    created_at:null,
    read_at:null

}

const initialState = {
  statistics: {},
  project_progress_chart: {} as ProjectProgressProps,
  project_status_chart: {} as ProjectStatusProps,
  employee_by_departement_chart: [],
  employee_tasks_rank_chart: [],
  tenure_employee_range_chart: [],
  employee_task_completion_chart: {
    categories: [],
    data: [],
  },
  notifications: {} as NotificationProps [],
};

const dashboardSlice =  createSlice({
name:"dashboard",
 initialState:initialState,
 reducers:{},
 extraReducers:(builder) =>{

  builder.addCase(
    fetchCompanySatistics.fulfilled,
    (state, action: PayloadAction<DashboardProps>) => {
      state.statistics = action.payload;
    }
  ),
    builder.addCase(
      fetchEmployeeSatistics.fulfilled,
      (state, action: PayloadAction<DashboardProps>) => {
        state.statistics = action.payload;
      }
    ),
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action: PayloadAction<[]>) => {
        state.notifications = action.payload;
      }
    ),
    builder.addCase(
      fetchPmSatistics.fulfilled,
      (state, action: PayloadAction<DashboardProps>) => {
        state.statistics = action.payload;
      }
    ),
    builder.addCase(
      projectProgress.fulfilled,
      (state, action: PayloadAction<DashboardProps>) => {
        state.project_progress_chart = action.payload;
      }
    ),
    builder.addCase(
      deleteNotifications.fulfilled,
      (state, action: PayloadAction) => {
        state.notifications = [];
      }
    ),
    builder.addCase(
      projectStatus.fulfilled,
      (state, action: PayloadAction<DashboardProps>) => {
        state.project_status_chart = action.payload;
      }
    ),
    builder.addCase(
      employeeByDepartement.fulfilled,
      (state, action: PayloadAction<DashboardProps>) => {
        state.employee_by_departement_chart = action.payload;
      }
    ),
    builder.addCase(
      employeeTasksRank.fulfilled,
      (state, action: PayloadAction<DashboardProps>) => {
        state.employee_tasks_rank_chart = action.payload;
      }
    ),
    builder.addCase(
      employeeTenureRange.fulfilled,
      (state, action: PayloadAction<DashboardProps>) => {
        state.tenure_employee_range_chart = action.payload;
      }
    ),
    builder.addCase(
      employeeTaskCompletion.fulfilled,
      (state, action: PayloadAction<DashboardProps>) => {
        state.employee_task_completion_chart = action.payload;
      }
    );
 }
}
)

export const fetchCompanySatistics = createAsyncThunk(
  "dashboard/fetchCompanySatistics",
  async () => {
    const response = await axiosClient.get('/company_statistics');
    return response.data;
  }
)

export const fetchPmSatistics = createAsyncThunk(
  "dashboard/fetchPmSatistics",
  async () => {
    const response = await axiosClient.get('/pm_statistics');
    return response.data;
  }
)
export const fetchNotifications = createAsyncThunk(
  "dashboard/fetchNotifications",
  async () => {
    const response = await axiosClient.get("/notifications");
    return response.data;
  }
);
export const setAsReadAt = createAsyncThunk("dashboard/setAsReadAt", async () => {
  const response = await axiosClient.get("/set_as_read_at");
});
export const deleteNotifications = createAsyncThunk(
  "dashboard/deleteNotifications",
  async (_,{dispatch}) => {
    const response = await axiosClient.delete("/delete_notifications");
    dispatch(setStatusMessage(response.data.message));
  }
);
export const fetchEmployeeSatistics = createAsyncThunk(
  "dashboard/fetchEmployeeSatistics",
  async () => {
    const response = await axiosClient.get('/employee_statistics');
    return response.data;
  }
)

export const projectProgress = createAsyncThunk(
  "dashboard/projectProgress",
  async () => {
    const response = await axiosClient.get('/project_progress');
    return response.data;
  }

)

export const projectStatus = createAsyncThunk(
  "dashboard/projectStatus",
  async () => {
    const response = await axiosClient.get('/project_status');
    return response.data;
  }
)
export const employeeByDepartement = createAsyncThunk(
  "dashboard/employee_by_departement",
  async () => {
    const response = await axiosClient.get('/employee_by_departement');
    return response.data.data;
  }
)

export const employeeTasksRank = createAsyncThunk(
  "dashboard/employeeTasksRank",
  async () => {
    const response = await axiosClient.get('/employee_status_rank');
    return response.data.data;
  }
)
export const employeeTenureRange = createAsyncThunk(
  "dashboard/employeeTenureRange",
  async () => {
    const response = await axiosClient.get('/employee_tenure_rank');
    return response.data.data;
  }
)
export const employeeTaskCompletion = createAsyncThunk(
  "dashboard/employeeTaskCompletion",
  async () => {
    const response = await axiosClient.get('/employee_task_completion');
    return response.data;
  }
)
export const dashboardActions = dashboardSlice.actions
export default dashboardSlice.reducer
