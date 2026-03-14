import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  createOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
  type AddMetaData,
  type InitialStateApiType,
  type OptionParams,
  type OrderInput,
  type OrderOutput,
  type OrderUpdateInput,
  type ResponseType,
} from "../../lib";

interface InitialStateType extends InitialStateApiType {
  data?: AddMetaData<OrderOutput[]>;
}

const initialState: InitialStateType = {
  data: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: undefined,
};

// get all orders thunk
export const getAllOrdersThunk = createAsyncThunk<
  ResponseType<AddMetaData<OrderOutput[]>>,
  OptionParams
>("order/getAllOrders", async (options, ThunkApi) => {
  try {
    return await getAllOrders(options);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// create order thunk
export const createOrderThunk = createAsyncThunk<
  ResponseType<undefined>,
  OrderInput
>("order/createOrder", async (data, ThunkApi) => {
  try {
    return await createOrder(data);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// update order thunk
export const updateOrderThunk = createAsyncThunk<
  ResponseType<undefined>,
  { id: string; data: OrderUpdateInput }
>("order/updateOrder", async ({ id, data }, ThunkApi) => {
  try {
    return await updateOrder(id, data);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// delete order thunk
export const deleteOrderThunk = createAsyncThunk<
  ResponseType<undefined>,
  string
>("order/deleteOrder", async (id, ThunkApi) => {
  try {
    return await deleteOrder(id);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: () => initialState,
  },
  extraReducers: (builder) => {
    // get all orders
    builder
      .addCase(getAllOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "get all orders successfully";
        state.data = action.payload.payload;
      })
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // create order
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(createOrderThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "create order successfully";
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // update order
    builder
      .addCase(updateOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(updateOrderThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "update order successfully";
      })
      .addCase(updateOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // delete order
    builder
      .addCase(deleteOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(deleteOrderThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "delete order successfully";
      })
      .addCase(deleteOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
