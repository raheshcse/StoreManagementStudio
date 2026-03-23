import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../features/products/productSlice";
import customersReducer from "../features/customers/customerSlice";
import salesReducer from "../features/sales/salesSlice";
import storesReducer from "../features/stores/storeSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        customers: customersReducer,  
        stores: storesReducer,
        sales: salesReducer
    }
});