import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  deleteOrder,
  type InitialStateApiType,
} from "../../../lib";

const initialState: InitialStateApiType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const deleteOrderAsyncThunk = createAsyncThunk(
  "order/deleteOrder",
  async (id: string, thunkApi) => {
    try {
      return await deleteOrder(id);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const deleteOrderSlice = createSlice({
  name: "deleteOrder",
  initialState,
  reducers: {
    resetDeleteOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrderAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "loading...";
      })
      .addCase(deleteOrderAsyncThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(deleteOrderAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetDeleteOrder } = deleteOrderSlice.actions;
export default deleteOrderSlice.reducer;
