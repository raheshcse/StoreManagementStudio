import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createCustomer, updateCustomer } from "./customerSlice";

const CustomerForm = ({ selectedCustomer, clearSelection }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        address: ""
    });

    useEffect(() => {
        if (selectedCustomer) {
            setFormData({
                name: selectedCustomer.name || "",
                address: selectedCustomer.address || ""
            });
        }
    }, [selectedCustomer]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedCustomer) {
            dispatch(updateCustomer(selectedCustomer.id, formData));
        } else {
            dispatch(createCustomer(formData));
        }

        setFormData({ name: "", address: "" });
        clearSelection();
    };

    return (
        <form style={{ marginBottom: "20px" }} onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Customer Name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
            />

            <button type="submit">
                {selectedCustomer ? "Update" : "Add"}
            </button>

            {selectedCustomer && (
                <button type="button" onClick={clearSelection}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default CustomerForm;