import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  catchAxiosError,
  getAllProducts,
  type InitialStateApiType,
  type OptionParams,
  type ResponseType,
  type ProductOutput,
} from "../../../lib";

interface InitialStateType extends InitialStateApiType {
  data?: ProductOutput[];
}

const initialState: InitialStateType = {
  data: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const getAllProductAsyncThunk = createAsyncThunk(
  "product/getAllProduct",
  async (options: OptionParams, thunkApi) => {
    try {
      return await getAllProducts(options);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const getAllProductsSlice = createSlice({
  name: "getAllProduct",
  initialState,
  reducers: {
    resetGetAllProducts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.data = undefined;
        state.message = "loading...";
      })
      .addCase(
        getAllProductAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseType<ProductOutput[]>>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "success";
          state.data = action.payload.payload;
        },
      )
      .addCase(getAllProductAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetGetAllProducts } = getAllProductsSlice.actions;
export default getAllProductsSlice.reducer;
