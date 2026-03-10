import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  updateUser,
  type InitialStateApiType,
  type UserUpdateInput,
} from "../../../lib";

const initialState: InitialStateApiType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const updateUserAsyncThunk = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }: { id: string; data: UserUpdateInput }, thunkApi) => {
    try {
      return await updateUser(id, data);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {
    resetUpdateUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "loading...";
      })
      .addCase(updateUserAsyncThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(updateUserAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetUpdateUser } = updateUserSlice.actions;
export default updateUserSlice.reducer;
