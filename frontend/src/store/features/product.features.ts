import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  type AddMetaData,
  type InitialStateApiType,
  type OptionParams,
  type ProductInput,
  type ProductOutput,
  type ProductUpdateInput,
  type ResponseType,
} from "../../lib";

interface InitialStateType extends InitialStateApiType {
  data?: AddMetaData<ProductOutput[]>;
}

const initialState: InitialStateType = {
  data: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: undefined,
};

// get all products thunk
export const getAllProductsThunk = createAsyncThunk<
  ResponseType<AddMetaData<ProductOutput[]>>,
  OptionParams
>("product/getAllProducts", async (options, ThunkApi) => {
  try {
    return await getAllProducts(options);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// create product thunk
export const createProductThunk = createAsyncThunk<
  ResponseType<undefined>,
  ProductInput
>("product/createProduct", async (data, ThunkApi) => {
  try {
    return await createProduct(data);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// update product thunk
export const updateProductThunk = createAsyncThunk<
  ResponseType<undefined>,
  { id: string; data: ProductUpdateInput }
>("product/updateProduct", async ({ id, data }, ThunkApi) => {
  try {
    return await updateProduct(id, data);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// delete product thunk
export const deleteProductThunk = createAsyncThunk<
  ResponseType<undefined>,
  string
>("product/deleteProduct", async (id, ThunkApi) => {
  try {
    return await deleteProduct(id);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: () => initialState,
  },
  extraReducers: (builder) => {
    // get all products
    builder
      .addCase(getAllProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "get all products successfully";
        state.data = action.payload.payload;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // create product
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(createProductThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "create product successfully";
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // update product
    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(updateProductThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "update product successfully";
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // delete product
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(deleteProductThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "delete product successfully";
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
