import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "./productSlice";
import ProductForm from "./ProductForm";

function ProductsPage() {
    const dispatch = useDispatch();

    const { items = [], isLoading, isError, errorMessage } =
        useSelector((state) => state.products);

    // ✅ Track selected product for edit
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <h2>Products</h2>

                {/* ✅ ADD BUTTON */}
                <button
                    className="btn-primary"
                    onClick={() => setSelectedProduct(null)}
                >
                    + Add Product
                </button>
            </div>

            {/* ✅ FORM (ADD + EDIT) */}
            <ProductForm
                key={selectedProduct ? selectedProduct.id : "new"}  // ✅ IMPORTANT FIX
                selectedProduct={selectedProduct}
                clearSelection={() => setSelectedProduct(null)}
            />

            {/* States */}
            {isLoading && <p>Loading...</p>}
            {isError && <p style={{ color: "red" }}>{errorMessage}</p>}

            {/* Table */}
            {!isLoading && !isError && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="3">No products found</td>
                            </tr>
                        ) : (
                            items.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        {/* ✅ EDIT BUTTON */}
                                        <button
                                            className="btn-edit"
                                            onClick={() =>
                                                setSelectedProduct({
                                                    ...product,
                                                    _editing: true // 🔥 important flag
                                                })
                                            }
                                        >
                                            Edit
                                        </button>

                                        {/* ✅ DELETE BUTTON */}
                                        <button
                                            className="btn-delete"
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ProductsPage;