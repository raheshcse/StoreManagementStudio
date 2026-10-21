import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    items: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
};

const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        setCustomers: (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        }
    }
});

// ✅ Actions (ONLY ONCE)
export const { setLoading, setCustomers, setError } = customerSlice.actions;

// ✅ Fetch Customers
export const fetchCustomers = () => async (dispatch) => {
    try {
        dispatch(setLoading());

        const response = await fetch("https://localhost:7155/api/Customers");

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
        }

        const data = await response.json();

        dispatch(setCustomers(data));
    } catch (error) {
        console.error("CUSTOMER ERROR:", error);
        dispatch(setError(error.message));
    }
};

// ✅ Create Customer
export const createCustomer = (customerData) => async (dispatch) => {
    try {
        await fetch("https://localhost:7155/api/Customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerData)
        });

        dispatch(fetchCustomers());
    } catch (error) {
        dispatch(setError(error.message));
    }
};

// ✅ Update Customer
export const updateCustomer = (id, customerData) => async (dispatch) => {
    try {
        await fetch(`https://localhost:7155/api/Customers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,              // 🔥 MUST ADD
                ...customerData
            })
        });

        dispatch(fetchCustomers());
    } catch (error) {
        dispatch(setError(error.message));
    }
};

// ✅ Delete Customer (update your existing one if needed)
export const deleteCustomer = (id) => async (dispatch) => {
    try {
        await fetch(`https://localhost:7155/api/Customers/${id}`, {
            method: "DELETE"
        });

        dispatch(fetchCustomers());
    } catch (error) {
        dispatch(setError(error.message));
    }
};
// ✅ Reducer
export default customerSlice.reducer;