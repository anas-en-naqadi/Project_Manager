import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../types";
import axiosClient from "../axios";
import { setStatusMessage } from "./TaskSlice";
import { AppDispatch } from "../store/store";
import { setStatusCode } from "./UserSlice";

interface ProjectState {
  projects: Project[];
}
const initialState: ProjectState = {
  projects: [],
};
const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchProjects.fulfilled,
      (state, action: PayloadAction<Project[]>) => {
        state.projects = [...action.payload];
      }
    ),
      builder.addCase(
        deleteProject.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          const index = state.projects.findIndex(
            (project) => project.id === action.payload.id
          );
          if (index !== -1) {
            state.projects.splice(index, 1);
          }
        }
      ),
      builder.addCase(
        addProject.fulfilled,
        (state, action: PayloadAction<{ project: Project }>) => {
          state.projects.push(action.payload.project);
        }
      );
    builder.addCase(
      updateProject.fulfilled,
      (state, action: PayloadAction<{ project: Project }>) => {
        const index = state.projects.findIndex(
          (project) => project.id === action.payload.project.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload.project;
        }
      }
    );
    builder.addCase(
      markProjectAsDelivered.fulfilled,
      (state, action: PayloadAction<{ project: Project }>) => {
        const index = state.projects.findIndex(
          (project) => project.id === action.payload.project.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload.project;
        }
      }
    );
  },
});

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    const response = await axiosClient.get("/project");
    return response.data;
  }
);
export const deleteProject = createAsyncThunk(
  "project/deleteproject",
  async (id: number, { dispatch }) => {
    try {
      const response = await axiosClient.delete(`/project/${id}`);
      dispatch(setStatusMessage(response.data.message));

      return { id };
    } catch (error: any) {
      dispatch(setStatusCode(error.status));
    }
  }
);
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (project: Project, { dispatch }) => {
    try {
      const response = await axiosClient.put(`/project/${project.id}`, project);
      dispatch(setStatusMessage(response.data.message));

      return { project: response.data.project };
    } catch (error: any) {
      dispatch(setStatusCode(error.status));
    }
  }
);

export const addProject = createAsyncThunk(
  "project/addProject",
  async (project: Project, { dispatch }) => {
    try {
      const response = await axiosClient.post(`/project`, project);
      dispatch(setStatusMessage(response.data.message));
      return { project: response.data.project };
    } catch (error: any) {
      dispatch(setStatusCode(error.status));
    }
  }
);

export const markProjectAsDelivered = createAsyncThunk(
  "project/markProjectAsDelivered",
  async ({ id, status }: { id: number; status: string }, { dispatch }) => {
    try {
      const response = await axiosClient.post(
        `/mark_project_as_delivered/${id}`,
        { status }
      );
      dispatch(setStatusMessage(response.data.message));
      return { project: response.data.project };
    } catch (error: any) {
      dispatch(setStatusCode(error.status));
    }
  }
);

export default projectSlice.reducer;
