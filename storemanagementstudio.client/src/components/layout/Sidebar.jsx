import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/customers">Customers</NavLink>
            <NavLink to="/stores">Stores</NavLink>
            <NavLink to="/sales">Sales</NavLink>
        </aside>
    );
};

export default Sidebar;
