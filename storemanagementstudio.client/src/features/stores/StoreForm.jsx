import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createStore, updateStore } from "./storeSlice";

function StoreForm({ selectedStore, clearSelection }) {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        address: ""
    });

    // ✅ ONLY update when selectedStore changes
    useEffect(() => {
        if (selectedStore) {
            setFormData({
                name: selectedStore.name || "",
                address: selectedStore.address || ""
            });
        } else {
            setFormData({ name: "", address: "" });
        }
    }, [selectedStore]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedStore) {
            dispatch(updateStore(selectedStore.id, formData));
        } else {
            dispatch(createStore(formData));
        }

        setFormData({ name: "", address: "" });
        clearSelection();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Store Name"
            />

            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
            />

            <button type="submit">
                {selectedStore ? "Update" : "Add"}
            </button>
        </form>
    );
}

export default StoreForm;