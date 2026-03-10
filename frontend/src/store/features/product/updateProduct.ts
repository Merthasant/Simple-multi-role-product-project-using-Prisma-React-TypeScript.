import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  updateProduct,
  type InitialStateApiType,
  type ProductUpdateInput,
} from "../../../lib";

const initialState: InitialStateApiType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const updateProductAsyncThunk = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }: { id: string; data: ProductUpdateInput }, thunkApi) => {
    try {
      return await updateProduct(id, data);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    resetUpdateProduct: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProductAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "loading...";
      })
      .addCase(updateProductAsyncThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(updateProductAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetUpdateProduct } = updateProductSlice.actions;
export default updateProductSlice.reducer;
