import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

import ProductsPage from "../features/products/ProductsPage";
import CustomersPage from "../features/customers/CustomersPage";
import StoresPage from "../features/stores/storesPage";
import SalesPage from "../features/sales/SalesPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="stores" element={<StoresPage />} />
                <Route path="sales" element={<SalesPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;