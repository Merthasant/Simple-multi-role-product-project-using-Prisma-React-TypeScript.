import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  catchAxiosError,
  register,
  type InitialStateApiType,
  type ResponseType,
  type UserOutput,
  type RegisterDataType,
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

export const registerAsyncThunk = createAsyncThunk(
  "auth/register",
  async (data: RegisterDataType, thunkApi) => {
    try {
      return await register(data);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegister: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.data = undefined;
        state.message = "loading...";
      })
      .addCase(
        registerAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseType<UserOutput>>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "success";
          state.data = action.payload.payload;
        },
      )
      .addCase(registerAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
