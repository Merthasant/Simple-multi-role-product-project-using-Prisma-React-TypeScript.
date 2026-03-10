import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  logout,
  type InitialStateApiType,
} from "../../../lib";

const initialState: InitialStateApiType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const logoutAsyncThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      return await logout();
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    resetLogout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "loading...";
      })
      .addCase(logoutAsyncThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(logoutAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetLogout } = logoutSlice.actions;
export default logoutSlice.reducer;
