import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
};

const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        setSales: (state, action) => {
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

export const { setLoading, setSales, setError } = salesSlice.actions;

// ✅ GET SALES
export const fetchSales = () => async (dispatch) => {
    try {
        dispatch(setLoading());

        const res = await fetch("https://localhost:7155/api/Sales");
        const data = await res.json();

        dispatch(setSales(data));
    } catch (err) {
        dispatch(setError(err.message));
    }
};

// ✅ CREATE SALE
export const createSale = (sale) => async (dispatch) => {
    try {
        await fetch("https://localhost:7155/api/Sales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sale)
        });

        dispatch(fetchSales());
    } catch (err) {
        dispatch(setError(err.message));
    }
};

// ✅ DELETE SALE
export const deleteSale = (id) => async (dispatch) => {
    try {
        await fetch(`https://localhost:7155/api/Sales/${id}`, {
            method: "DELETE"
        });

        dispatch(fetchSales());
    } catch (err) {
        dispatch(setError(err.message));
    }
};

// UPDATE SALES
export const updateSale = ({ id, saleData }) => async (dispatch) => {
    try {
        await fetch(`https://localhost:7155/api/Sales/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saleData)
        });

        dispatch(fetchSales()); // refresh list
    } catch (error) {
        console.error("UPDATE SALE ERROR:", error);
    }
};
export default salesSlice.reducer;