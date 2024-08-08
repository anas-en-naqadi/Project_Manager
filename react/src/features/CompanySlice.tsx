import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyType } from "../types";
import axiosClient from "../axios";
import { setCompany } from "./UserSlice";
import { setStatusMessage } from "./TaskSlice";

interface CompanyProps {
  company: CompanyType;
  validationErrors: string[];
}

const initialState:CompanyProps = {
  company:{} as CompanyType,
  validationErrors: [],
};
export const storeCompany = createAsyncThunk(
  "user/storeCompany",
  async (company: CompanyType, { rejectWithValue,dispatch}) => {
    try {
      const response = await axiosClient.post("/company", company);
      dispatch(setStatusMessage(response.data.message));
      dispatch(setCompany(response.data.company));
    } catch (error: any) {
      const validationErrors = error.customErrors;
      return rejectWithValue(validationErrors);
    }
  }
);
export const UpdateCompany = createAsyncThunk(
  "user/UpdateCompany",
  async (company: CompanyType, { rejectWithValue,dispatch }) => {
    try {
      const response = await axiosClient.put("/company", company);
      dispatch(setStatusMessage(response.data.message));
      dispatch(setCompany(response.data.company));

    } catch (error: any) {
      const validationErrors = error.customErrors;
      return rejectWithValue(validationErrors);
    }
  }
);

const userSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(storeCompany.fulfilled, (state, action: PayloadAction<any>) => {
      state.validationErrors = [];
    });
    builder.addCase(storeCompany.rejected, (state, action) => {
        state.validationErrors = action.payload;
        state.validationErrors = [];

    });
    builder.addCase(UpdateCompany.fulfilled, (state, action: PayloadAction<any>) => {
      state.validationErrors = [];
    });
    builder.addCase(UpdateCompany.rejected, (state, action) => {
        state.validationErrors = action.payload;
    });
  },
});

export default userSlice.reducer;
