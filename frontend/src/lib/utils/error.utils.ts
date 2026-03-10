import type { AsyncThunkConfig, GetThunkAPI } from "@reduxjs/toolkit";
import axios from "axios";

export const catchAxiosError = (
  err: unknown,
  thunkApi: GetThunkAPI<AsyncThunkConfig>,
) => {
  if (axios.isAxiosError(err)) {
    return thunkApi.rejectWithValue(err.response?.data);
  }
  return thunkApi.rejectWithValue("unexpected error");
};
