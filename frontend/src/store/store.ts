import { configureStore } from "@reduxjs/toolkit";
import { authSlice, orderSlice, productSlice, userSlice } from "./features";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
