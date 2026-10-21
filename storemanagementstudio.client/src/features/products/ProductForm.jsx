import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "./productSlice";

function ProductForm({ selectedProduct, clearSelection }) {
    const dispatch = useDispatch();

    // ✅ Initialize from selectedProduct
    const [formData, setFormData] = useState({
        name: selectedProduct?.name || "",
        price: selectedProduct?.price || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedProduct) {
            dispatch(updateProduct({
                id: selectedProduct.id,
                productData: {
                    id: selectedProduct.id,
                    ...formData
                }
            }));
        } else {
            dispatch(createProduct(formData));
        }

        clearSelection();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
            />

            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
            />

            <button type="submit">
                {selectedProduct ? "Update" : "Add"}
            </button>
        </form>
    );
}

export default ProductForm;