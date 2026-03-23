import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSale, updateSale } from "./salesSlice";

function SalesForm({ selectedSale, clearSelection }) {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        productId: "",
        customerId: "",
        storeId: "",
        dateSold: ""
    });

    // dropdown data
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [stores, setStores] = useState([]);

    // ✅ FETCH DATA
    useEffect(() => {
        fetch("https://localhost:7155/api/Products")
            .then(res => res.json())
            .then(setProducts);

        fetch("https://localhost:7155/api/Customers")
            .then(res => res.json())
            .then(setCustomers);

        fetch("https://localhost:7155/api/Stores")
            .then(res => res.json())
            .then(setStores);
    }, []);

    // ✅ PREFILL (EDIT MODE) — FIXED
    useEffect(() => {
    if (selectedSale && selectedSale._editing) {
        const newData = {
            productId: selectedSale.productId || "",
            customerId: selectedSale.customerId || "",
            storeId: selectedSale.storeId || "",
            dateSold: selectedSale.dateSold
                ? selectedSale.dateSold.split("T")[0]
                : ""
        };

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData(prev => {
            if (JSON.stringify(prev) !== JSON.stringify(newData)) {
                return newData;
            }
            return prev;
        });
    }
}, [selectedSale]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            productId: Number(formData.productId),
            customerId: Number(formData.customerId),
            storeId: Number(formData.storeId),
            dateSold: formData.dateSold
        };

        if (selectedSale && selectedSale._editing) {
            dispatch(updateSale({ id: selectedSale.id, saleData: payload }));
            clearSelection();
        } else {
            dispatch(createSale(payload));
        }

        // reset
        setFormData({
            productId: "",
            customerId: "",
            storeId: "",
            dateSold: ""
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>

            <select name="productId" value={formData.productId} onChange={handleChange}>
                <option value="">Select Product</option>
                {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>

            <select name="customerId" value={formData.customerId} onChange={handleChange}>
                <option value="">Select Customer</option>
                {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>

            <select name="storeId" value={formData.storeId} onChange={handleChange}>
                <option value="">Select Store</option>
                {stores.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>

            <input
                type="date"
                name="dateSold"
                value={formData.dateSold}
                onChange={handleChange}
            />

            <button type="submit">
                {selectedSale && selectedSale._editing ? "Update" : "Save"}
            </button>
        </form>
    );
}

export default SalesForm;