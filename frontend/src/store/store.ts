import { configureStore } from "@reduxjs/toolkit";
import {
  getAllUsersSlice,
  createUserSlice,
  updateUserSlice,
  deleteUserSlice,
  getAllProductsSlice,
  createProductSlice,
  updateProductSlice,
  deleteProductSlice,
  getAllOrdersSlice,
  createOrderSlice,
  updateOrderSlice,
  deleteOrderSlice,
  getMeSlice,
  loginSlice,
  registerSlice,
  logoutSlice,
} from "./features";

export const store = configureStore({
  reducer: {
    getAllUsers: getAllUsersSlice,
    createUser: createUserSlice,
    updateUser: updateUserSlice,
    deleteUser: deleteUserSlice,
    getAllProducts: getAllProductsSlice,
    createProduct: createProductSlice,
    updateProduct: updateProductSlice,
    deleteProduct: deleteProductSlice,
    getAllOrders: getAllOrdersSlice,
    createOrder: createOrderSlice,
    updateOrder: updateOrderSlice,
    deleteOrder: deleteOrderSlice,
    getMe: getMeSlice,
    login: loginSlice,
    register: registerSlice,
    logout: logoutSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
