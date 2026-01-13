import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import customerReducer from "../features/customers/customerSlice";
import storeReducer from "../features/stores/storeSlice";
import salesReducer from "../features/sales/salesSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    customers: customerReducer,
    stores: storeReducer,
    sales: salesReducer
  }
});
