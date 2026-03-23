import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
};

const storeSlice = createSlice({
    name: "stores",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        setStores: (state, action) => {
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

export const { setLoading, setStores, setError } = storeSlice.actions;

// ✅ FETCH
export const fetchStores = () => async (dispatch) => {
    try {
        dispatch(setLoading());

        const res = await fetch("https://localhost:7155/api/Stores");
        const data = await res.json();

        dispatch(setStores(data));
    } catch (err) {
        dispatch(setError(err.message));
    }
};

// ✅ CREATE
export const createStore = (storeData) => async (dispatch) => {
    try {
        await fetch("https://localhost:7155/api/Stores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(storeData)
        });

        dispatch(fetchStores());
    } catch (err) {
        dispatch(setError(err.message));
    }
};

// ✅ UPDATE
export const updateStore = (id, storeData) => async (dispatch) => {
    try {
        await fetch(`https://localhost:7155/api/Stores/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,          // 🔥 IMPORTANT
                ...storeData
            })
        });

        dispatch(fetchStores());
    } catch (err) {
        dispatch(setError(err.message));
    }
};

// ✅ DELETE
export const deleteStore = (id) => async (dispatch) => {
    try {
        await fetch(`https://localhost:7155/api/Stores/${id}`, {
            method: "DELETE"
        });

        dispatch(fetchStores());
    } catch (err) {
        dispatch(setError(err.message));
    }
};

export default storeSlice.reducer;