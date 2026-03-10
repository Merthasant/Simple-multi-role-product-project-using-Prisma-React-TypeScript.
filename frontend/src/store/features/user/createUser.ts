import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  createUser,
  type InitialStateApiType,
  type UserInput,
} from "../../../lib";

const initialState: InitialStateApiType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const createUserAsyncThunk = createAsyncThunk(
  "user/createUser",
  async (data: UserInput, thunkApi) => {
    try {
      return await createUser(data);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    resetCreateUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "loading...";
      })
      .addCase(createUserAsyncThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(createUserAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetCreateUser } = createUserSlice.actions;
export default createUserSlice.reducer;
