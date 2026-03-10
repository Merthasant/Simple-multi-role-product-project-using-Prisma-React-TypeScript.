import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  createProduct,
  type InitialStateApiType,
  type ProductInput,
} from "../../../lib";

const initialState: InitialStateApiType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const createProductAsyncThunk = createAsyncThunk(
  "product/createProduct",
  async (data: ProductInput, thunkApi) => {
    try {
      return await createProduct(data);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    resetCreateProduct: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "loading...";
      })
      .addCase(createProductAsyncThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(createProductAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetCreateProduct } = createProductSlice.actions;
export default createProductSlice.reducer;
