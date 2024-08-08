import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyType, Credentials, Password, User } from "../types";
import axiosClient from "../axios";
import { setStatusMessage } from "./TaskSlice";

interface UserData {
  data: User;
  token: string | null;
  validationErrors: string[];
  statusCode:number;
}

const initialState: UserData = {
  data: {} as User,
  token: sessionStorage.getItem("token"),
  validationErrors: [],
  statusCode: 0,
};
export const login = createAsyncThunk(
  "user/login",
  async (credentials: Credentials, { rejectWithValue,dispatch }) => {
    try {
      const response = await axiosClient.post("/login", credentials);
      if(response.status === 200)
        {
          setTimeout(() => {
            dispatch(loggedUser());
          }, 1000);
        }
      return response.data;
    } catch (error: any) {
      const validationErrors = error.customErrors;
      return rejectWithValue(validationErrors);
    }
  }
);
export const register = createAsyncThunk(
  "user/register",
  async (user: User, { rejectWithValue,dispatch }) => {
    try {
      const response = await axiosClient.post("/register", user);
      if(response.status === 200)
      {
        setTimeout(()=>{
          dispatch(loggedUser());
        },1000);
      }
      return response.data;
    } catch (error: any) {
      const validationErrors = error.customErrors;
      return rejectWithValue(validationErrors);
    }
  }
);
export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (user: User, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosClient.post("/update_user", user);
      if (response.status === 200) {
        dispatch(loggedUser());
                        dispatch(setStatusMessage(response.data.message));

      }
      return response.data;
    } catch (error: any) {
      const validationErrors = error.customErrors;
      return rejectWithValue(validationErrors);
    }
  }
);
export const updateCompanyInfo = createAsyncThunk(
  "user/updateCompanyInfo",
  async (company: CompanyType, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosClient.post("/update_company", company);
      if (response.status === 200) {
        dispatch(loggedUser());
                        dispatch(setStatusMessage(response.data.message));

      }
      return response.data;
    } catch (error: any) {
      const validationErrors = error.customErrors;
      return rejectWithValue(validationErrors);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (password: Password, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosClient.post("/update_password", password);
      if (response.status === 200) {
        dispatch(loggedUser());
                dispatch(setStatusMessage(response.data.message));

      }
      return response.data;
    } catch (error: any) {
      const validationErrors = error.customErrors;
      return rejectWithValue(validationErrors);
    }
  }
);
export const loggedUser = createAsyncThunk(
  "user/loggedUser",
  async () => {
      const response = await axiosClient.get("/user");
      return response.data;
  }
);
export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axiosClient.post("/logout");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<CompanyType>) => {
      state.data.company = action.payload;
    },
    resetUser: () => initialState,
    setStatusCode: (state, action: PayloadAction<number>) => {
      state.statusCode = action.payload;
    },
    resetValidationErros: (state) => {
      state.validationErrors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.token = action.payload.token;
        sessionStorage.setItem("token", action.payload.token as string);
        state.validationErrors = [];
      }
    );
    builder.addCase(
      loggedUser.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.data = action.payload;
        state.validationErrors = [];
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.validationErrors = action.payload as string[];
    });
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.token = action.payload.token;
        sessionStorage.setItem("token", action.payload.token as string);
        state.validationErrors = [];
      }
    );
    builder.addCase(register.rejected, (state, action) => {
      state.validationErrors = action.payload as string[];
    });
    builder.addCase(
      logout.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.data = {} as User;
        sessionStorage.removeItem("token");
        state.token = "";
        state.validationErrors = [];
      }
    );
    builder.addCase(
      updateUserInfo.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.validationErrors = [];
      }
    );
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.validationErrors = action.payload as string[];
    });
    builder.addCase(
      updateCompanyInfo.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.validationErrors = [];
      }
    );
    builder.addCase(updateCompanyInfo.rejected, (state, action) => {
      state.validationErrors = action.payload as string[];
    });
    builder.addCase(
      updatePassword.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.validationErrors = [];
      }
    );
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.validationErrors = action.payload as string[];
    });
  },
});

export const { setCompany, resetUser, setStatusCode, resetValidationErros } =
  userSlice.actions;
export default userSlice.reducer;
