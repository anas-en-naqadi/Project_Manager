import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../axios";
import { Task } from "../types";
import { setStatusCode } from "./UserSlice";

interface TasksState {
  tasks: Task[];
  statusMessage: string | null;
  task: Task | null;
}

const initialState: TasksState = {
  tasks: [],
  statusMessage: null,
  task: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.statusMessage = null;
    },
    setStatusMessage: (state, action: PayloadAction<string>) => {
      state.statusMessage = action.payload;
    },
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<Task[]>) => {
        state.tasks = [...action.payload];
      }
    );
    builder.addCase(
      deleteTask.fulfilled,
      (state, action: PayloadAction<{ response: string; taskId: number }>) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.taskId
        );
        state.statusMessage = `Task with ID ${action.payload.taskId} ${action.payload.response}`;
      }
    );
    builder.addCase(
      addTask.fulfilled,
      (state, action: PayloadAction<{ message: string; task: Task }>) => {
        state.tasks.push(action.payload.task);
        state.statusMessage = action.payload.message;
      }
    );
    builder.addCase(
      updateTask.fulfilled,
      (state, action: PayloadAction<{ message: string; task: Task }>) => {
        state.statusMessage = action.payload.message;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.task.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
      }
    );
    builder.addCase(
      changeTaskStatus.fulfilled,
      (state, action: PayloadAction<{ message: string; task: Task }>) => {
        state.statusMessage = action.payload.message;

        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.task.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
      }
    );
  },
});

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axiosClient.get("/task");
  return response.data;
});
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task, { dispatch }) => {
    try {
      const response = await axiosClient.put(`/task/${task.id}`, task);
      return { message: response.data.message, task: response.data.task };
    } catch (error: any) {
      dispatch(setStatusCode(error.status as number));
    }
  }
);
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Task, { dispatch }) => {
    try {
      const response = await axiosClient.post("/task", task);
      return { message: response.data.message, task: response.data.task };
    } catch (error: any) {
      dispatch(setStatusCode(error.status as number));
    }
  }
);
export const changeTaskStatus = createAsyncThunk(
  "tasks/changeTaskStatus",
  async (data: { status: string; id: number }, { dispatch }) => {
    try {
      const response = await axiosClient.post("/set_task_status/" + data.id, {
        status: data.status,
      });
      return { message: response.data.message, task: response.data.task };
    } catch (error: any) {
      dispatch(setStatusCode(error.status as number));
    }
  }
);
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
    try {
      const response = await axiosClient.delete(`/task/${taskId}`);
      return { response: response.data, taskId };
    } catch (error: any) {
      dispatch(setStatusCode(error.status as number));
    }
  }
);

export const { resetStatus, setTask, setStatusMessage } = taskSlice.actions;
export default taskSlice.reducer;
