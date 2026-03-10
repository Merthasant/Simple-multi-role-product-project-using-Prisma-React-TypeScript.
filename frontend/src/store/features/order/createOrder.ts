import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  createOrder,
  type InitialStateApiType,
  type OrderInput,
} from "../../../lib";

const initialState: InitialStateApiType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const createOrderAsyncThunk = createAsyncThunk(
  "order/createOrder",
  async (data: OrderInput, thunkApi) => {
    try {
      return await createOrder(data);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    resetCreateOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "loading...";
      })
      .addCase(createOrderAsyncThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(createOrderAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetCreateOrder } = createOrderSlice.actions;
export default createOrderSlice.reducer;
