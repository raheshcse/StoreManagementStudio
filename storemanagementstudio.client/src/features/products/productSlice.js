import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

// 🔥 Fetch all products
export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (_, thunkAPI) => {
        try {
            const data = await productService.getProducts();
            return data;
        } catch (error) {
            console.error("FETCH ERROR:", error);
            return thunkAPI.rejectWithValue(error.message || "Fetch failed");
        }
    }
);

// 🔥 Create product
export const createProduct = createAsyncThunk(
    "products/create",
    async (productData, thunkAPI) => {
        try {
            return await productService.createProduct(productData);
        } catch (error) {
            console.error("CREATE ERROR:", error);
            return thunkAPI.rejectWithValue(error.message || "Create failed");
        }
    }
);

// 🔥 Delete product
export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id, thunkAPI) => {
        try {
            await productService.deleteProduct(id);
            return id;
        } catch (error) {
            console.error("DELETE ERROR:", error);
            return thunkAPI.rejectWithValue(error.message || "Delete failed");
        }
    }
);

// 🔥 Update product
export const updateProduct = createAsyncThunk(
    "products/update",
    async ({ id, productData }, thunkAPI) => {
        try {
            return await productService.updateProduct(id, productData);
        } catch (error) {
            console.error("UPDATE ERROR:", error);
            return thunkAPI.rejectWithValue(error.message || "Update failed");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        isLoading: false,
        isError: false,
        errorMessage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })

            // CREATE
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            // DELETE
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (product) => product.id !== action.payload
                );
            })

            // UPDATE
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (product) => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default productSlice.reducer;