import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchStores,
    deleteStore
} from "./storeSlice";
import StoreForm from "./StoreForm";

function StoresPage() {
    const dispatch = useDispatch();
    const [selectedStore, setSelectedStore] = useState(null);

    const { items = [], isLoading } =
        useSelector((state) => state.stores);

    useEffect(() => {
        dispatch(fetchStores());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this store?")) {
            dispatch(deleteStore(id));
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Stores</h2>

                <button onClick={() => setSelectedStore(null)}>
                    + Add Store
                </button>
            </div>

            <StoreForm
                selectedStore={selectedStore}
                clearSelection={() => setSelectedStore(null)}
            />

            {isLoading && <p>Loading...</p>}

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((store) => (
                        <tr key={store.id}>
                            <td>{store.name}</td>
                            <td>{store.address}</td>

                            <td>
                                <button
                                    onClick={() =>
                                        setSelectedStore(store)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(store.id)
                                    }
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

export default StoresPage;