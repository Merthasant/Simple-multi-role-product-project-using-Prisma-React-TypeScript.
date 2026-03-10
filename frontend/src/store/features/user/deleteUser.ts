import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  deleteUser,
  type InitialStateApiType,
} from "../../../lib";

const initialState: InitialStateApiType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const deleteUserAsyncThunk = createAsyncThunk(
  "user/deleteUser",
  async (id: string, thunkApi) => {
    try {
      return await deleteUser(id);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {
    resetDeleteUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "loading...";
      })
      .addCase(deleteUserAsyncThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(deleteUserAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetDeleteUser } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;
