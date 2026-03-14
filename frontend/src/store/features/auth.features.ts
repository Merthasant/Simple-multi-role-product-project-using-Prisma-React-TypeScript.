import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  login,
  logout,
  me,
  register,
  type AuthOutputDataType,
  type InitialStateApiType,
  type LoginInputDataType,
  type RegisterInputDataType,
  type ResponseType,
  type UserOutput,
} from "../../lib";

interface InitialStateType extends InitialStateApiType {
  data?: UserOutput;
  token?: string;
}

const initialState: InitialStateType = {
  data: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: undefined,
};

// login thunk
export const loginThunk = createAsyncThunk<
  ResponseType<AuthOutputDataType>,
  LoginInputDataType
>("auth/login", async (data, ThunkApi) => {
  try {
    return await login(data);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// register thunk
export const registerThunk = createAsyncThunk<
  ResponseType<AuthOutputDataType>,
  RegisterInputDataType
>("auth/register", async (data, ThunkApi) => {
  try {
    return await register(data);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// me thunk
export const meThunk = createAsyncThunk<ResponseType<UserOutput>, void>(
  "auth/me",
  async (_, ThunkApi) => {
    try {
      return await me();
    } catch (err) {
      return catchAxiosError(err, ThunkApi);
    }
  },
);

//
export const logoutThunk = createAsyncThunk<ResponseType<undefined>, void>(
  "auth/logout",
  async (_, ThunkApi) => {
    try {
      return await logout();
    } catch (err) {
      return catchAxiosError(err, ThunkApi);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "user login successfully";
        state.data = action.payload.payload?.data;
        state.token = action.payload.payload?.token.accessToken;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
    // register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "user register successfully";
        state.data = action.payload.payload?.data;
        state.token = action.payload.payload?.token.accessToken;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // me
    builder
      .addCase(meThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(meThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "user authorization successfully";
        state.data = action.payload.payload;
      })
      .addCase(meThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // logout
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "logout success";
        state.data = undefined;
        state.token = undefined;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
