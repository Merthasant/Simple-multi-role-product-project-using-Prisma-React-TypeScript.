import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  catchAxiosError,
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  type InitialStateApiType,
  type OptionParams,
  type UserInput,
  type UserOutput,
  type UserUpdateInput,
  type ResponseType,
  type AddMetaData,
} from "../../lib";

interface InitialStateType extends InitialStateApiType {
  data?: AddMetaData<UserOutput[]>;
}

const initialState: InitialStateType = {
  data: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: undefined,
};

// get all users thunk
export const getAllUsersThunk = createAsyncThunk<
  ResponseType<AddMetaData<UserOutput[]>>,
  OptionParams
>("user/getAllUsers", async (options, ThunkApi) => {
  try {
    return await getAllUsers(options);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// create user thunk
export const createUserThunk = createAsyncThunk<
  ResponseType<undefined>,
  UserInput
>("user/createUser", async (data, ThunkApi) => {
  try {
    return await createUser(data);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// update user thunk
export const updateUserThunk = createAsyncThunk<
  ResponseType<undefined>,
  { id: string; data: UserUpdateInput }
>("user/updateUser", async ({ id, data }, ThunkApi) => {
  try {
    return await updateUser(id, data);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

// delete user thunk
export const deleteUserThunk = createAsyncThunk<
  ResponseType<undefined>,
  string
>("user/deleteUser", async (id, ThunkApi) => {
  try {
    return await deleteUser(id);
  } catch (err) {
    return catchAxiosError(err, ThunkApi);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    // get all users
    builder
      .addCase(getAllUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "get all users successfully";
        state.data = action.payload.payload;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // create user
    builder
      .addCase(createUserThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(createUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "create user successfully";
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // update user
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(updateUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "update user successfully";
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });

    // delete user
    builder
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "delete user successfully";
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
