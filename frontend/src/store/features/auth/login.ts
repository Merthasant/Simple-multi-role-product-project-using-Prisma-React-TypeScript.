import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  catchAxiosError,
  login,
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

export const loginAsyncThunk = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkApi,
  ) => {
    try {
      return await login(email, password);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLogin: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.data = undefined;
        state.message = "loading...";
      })
      .addCase(
        loginAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseType<UserOutput>>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "success";
          state.data = action.payload.payload;
        },
      )
      .addCase(loginAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
