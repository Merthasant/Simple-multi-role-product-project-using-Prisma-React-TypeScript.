import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  updateOrder,
  type InitialStateApiType,
  type OrderUpdateInput,
} from "../../../lib";

const initialState: InitialStateApiType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const updateOrderAsyncThunk = createAsyncThunk(
  "order/updateOrder",
  async ({ id, data }: { id: string; data: OrderUpdateInput }, thunkApi) => {
    try {
      return await updateOrder(id, data);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const updateOrderSlice = createSlice({
  name: "updateOrder",
  initialState,
  reducers: {
    resetUpdateOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "loading...";
      })
      .addCase(updateOrderAsyncThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(updateOrderAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetUpdateOrder } = updateOrderSlice.actions;
export default updateOrderSlice.reducer;
