import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  deleteProduct,
  type InitialStateApiType,
} from "../../../lib";

const initialState: InitialStateApiType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const deleteProductAsyncThunk = createAsyncThunk(
  "product/deleteProduct",
  async (id: string, thunkApi) => {
    try {
      return await deleteProduct(id);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    resetDeleteProduct: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "loading...";
      })
      .addCase(deleteProductAsyncThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(deleteProductAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetDeleteProduct } = deleteProductSlice.actions;
export default deleteProductSlice.reducer;
