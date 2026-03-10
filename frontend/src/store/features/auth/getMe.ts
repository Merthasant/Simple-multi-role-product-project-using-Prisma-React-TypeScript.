import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  catchAxiosError,
  me,
  type InitialStateApiType,
  type ResponseType,
  type UserOutput,
} from "../../../lib";

interface InitialStateType extends InitialStateApiType {
  data?: UserOutput;
}

const initialState: InitialStateType = {
  data: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const getMeAsyncThunk = createAsyncThunk(
  "auth/getMe",
  async (_, thunkApi) => {
    try {
      return await me();
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const getMeSlice = createSlice({
  name: "getMe",
  initialState,
  reducers: {
    resetGetMe: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMeAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.data = undefined;
        state.message = "loading...";
      })
      .addCase(
        getMeAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseType<UserOutput>>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "success";
          state.data = action.payload.payload;
        },
      )
      .addCase(getMeAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetGetMe } = getMeSlice.actions;
export default getMeSlice.reducer;
