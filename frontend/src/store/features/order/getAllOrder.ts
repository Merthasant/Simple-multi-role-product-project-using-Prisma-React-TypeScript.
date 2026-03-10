import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  catchAxiosError,
  getAllOrders,
  type InitialStateApiType,
  type OptionParams,
  type ResponseType,
  type OrderOutput,
} from "../../../lib";

interface InitialStateType extends InitialStateApiType {
  data?: OrderOutput[];
}

const initialState: InitialStateType = {
  data: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const getAllOrderAsyncThunk = createAsyncThunk(
  "order/getAllOrder",
  async (options: OptionParams, thunkApi) => {
    try {
      return await getAllOrders(options);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const getAllOrdersSlice = createSlice({
  name: "getAllOrder",
  initialState,
  reducers: {
    resetGetAllOrders: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrderAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.data = undefined;
        state.message = "loading...";
      })
      .addCase(
        getAllOrderAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseType<OrderOutput[]>>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "success";
          state.data = action.payload.payload;
        },
      )
      .addCase(getAllOrderAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetGetAllOrders } = getAllOrdersSlice.actions;
export default getAllOrdersSlice.reducer;
