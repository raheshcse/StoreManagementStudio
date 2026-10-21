import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales, deleteSale } from "./salesSlice";
import SalesForm from "./SalesForm";

function SalesPage() {
    const dispatch = useDispatch();

    const { items = [], isLoading, isError, errorMessage } =
        useSelector((state) => state.sales);

    const [selectedSale, setSelectedSale] = useState(null);

    useEffect(() => {
        dispatch(fetchSales());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Delete this sale?")) {
            dispatch(deleteSale(id));
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Sales</h2>
                <button onClick={() => setSelectedSale(null)}>
                    + Add Sale
                </button>
            </div>

            {/* ✅ FIXED */}
            <SalesForm
                selectedSale={selectedSale}
                clearSelection={() => setSelectedSale(null)}
            />

            {isLoading && <p>Loading...</p>}
            {isError && <p>{errorMessage}</p>}

            <table className="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Customer</th>
                        <th>Store</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.productName}</td>
                            <td>{sale.customerName}</td>
                            <td>{sale.storeName}</td>
                            <td>{sale.dateSold}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        setSelectedSale({
                                            id: sale.id,
                                            productId: sale.productId,
                                            customerId: sale.customerId,
                                            storeId: sale.storeId,
                                            dateSold: sale.dateSold,
                                            _editing: true
                                        })
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(sale.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesPage;