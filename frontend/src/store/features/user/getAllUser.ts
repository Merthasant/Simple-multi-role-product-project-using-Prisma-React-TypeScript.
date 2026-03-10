import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  catchAxiosError,
  getAllUsers,
  type InitialStateApiType,
  type OptionParams,
  type ResponseType,
  type UserOutput,
} from "../../../lib";

interface InitialStateType extends InitialStateApiType {
  data?: UserOutput[];
}

const initialState: InitialStateType = {
  data: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const getAllUserAsyncThunk = createAsyncThunk(
  "user/getAllUser",
  async (options: OptionParams, thunkApi) => {
    try {
      return await getAllUsers(options);
    } catch (err) {
      return catchAxiosError(err, thunkApi);
    }
  },
);

export const getAllUsersSlice = createSlice({
  name: "getAllUser",
  initialState,
  reducers: {
    resetGetAllUsers: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.data = undefined;
        state.message = "loading...";
      })
      .addCase(
        getAllUserAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseType<UserOutput[]>>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "success";
          state.data = action.payload.payload;
        },
      )
      .addCase(getAllUserAsyncThunk.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetGetAllUsers } = getAllUsersSlice.actions;
export default getAllUsersSlice.reducer;
