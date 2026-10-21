import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCustomers,
    deleteCustomer
} from "./customerSlice";
import CustomerForm from "./CustomerForm";

const CustomersPage = () => {
    const dispatch = useDispatch();
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const { items = [], isLoading, isError, errorMessage } =
        useSelector((state) => state.customers);

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Delete this customer?")) {
            dispatch(deleteCustomer(id));
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Customers</h2>

                <button onClick={() => setSelectedCustomer(null)}>
                    + Add Customer
                </button>
            </div>

            {/* FORM */}
            <CustomerForm
                selectedCustomer={selectedCustomer}
                clearSelection={() => setSelectedCustomer(null)}
            />

            {isLoading && <p>Loading...</p>}
            {isError && <p style={{ color: "red" }}>{errorMessage}</p>}

            {!isLoading && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() =>
                                            setSelectedCustomer(customer)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn-delete"
                                        onClick={() =>
                                            handleDelete(customer.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CustomersPage;