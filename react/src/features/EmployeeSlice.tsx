import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../types";
import axiosClient from "../axios";
import { setStatusMessage } from "./TaskSlice";
import { setStatusCode } from "./UserSlice";

interface EmployeeState {
  employees: Employee[];
  validationErrors:Array<string>;
}
const initialState: EmployeeState = {
  employees: [],
  validationErrors: [],
};
const EmployeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchEmployees.fulfilled,
      (state, action: PayloadAction<Employee[]>) => {
        state.employees = action.payload;
      }
    ),
      builder.addCase(
        deleteEmployee.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          const index = state.employees.findIndex(
            (employee) => employee.id === action.payload.id
          );
          if (index !== -1) {
            state.employees.splice(index, 1);
          }
        }
      ),
      builder.addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<{ employee: Employee }>) => {
          const index = state.employees.findIndex(
            (employee) => employee.id === action.payload.employee.id
          );
          if (index !== -1) {
            state.employees[index] = action.payload.employee;
          }
        }
      ),
      builder.addCase(
        addEmployee.fulfilled,
        (state, action: PayloadAction<{ employee: Employee }>) => {
          state.employees.push(action.payload.employee);
        }
      );
      builder.addCase(addEmployee.rejected, (state, action) => {
        state.validationErrors = action.payload as string[];
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
        state.validationErrors = action.payload as string[];
    });
      builder.addCase(changeRole.fulfilled,(state,action: PayloadAction<{employee:Employee}>)=>{
        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.employee.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload.employee;
        }      });
  },
});

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    const response = await axiosClient.get("/employee");
    return response.data;
  }
);
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id: number, { dispatch }) => {
   try{ const response = await axiosClient.delete(`/employee/${id}`);
    dispatch(setStatusMessage(response.data.message));

    return { id };}
      catch(error:any){
    dispatch(setStatusCode(error.status))
  }
  }
);
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employee: Employee, { dispatch,rejectWithValue }) => {
   try{ const response = await axiosClient.put(
      `/employee/${employee.id}`,
      employee
    );
    dispatch(setStatusMessage(response.data.message));

    return { employee: response.data.employee };}
     catch (error: any) {
          dispatch(setStatusCode(error.status))
      const validationErrors = error.customErrors;
      return rejectWithValue(validationErrors);
  }
}
);

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee: Employee, { rejectWithValue,dispatch }) => {
    try {
      const response = await axiosClient.post(`/employee`, employee);
      dispatch(setStatusMessage(response.data.message));

      return { employee: response.data.employee };
    } catch (error: any) {
          dispatch(setStatusCode(error.status))

      const validationErrors = error.customErrors;
      return rejectWithValue(validationErrors);
    }
  }
);
export const changeRole = createAsyncThunk(
  "employee/changeRole" ,
  async (employee: Employee, { dispatch }) => {
    const response = await axiosClient.put(`/change_role`,employee);
    dispatch(setStatusMessage(response.data.message));
    return {employee:response.data.employee};
  }
)

export default EmployeeSlice.reducer;
