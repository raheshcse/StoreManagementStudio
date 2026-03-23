import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="logo">SMS</h2>

            <nav className="nav-links">
                <NavLink to="/" end className="nav-item">
                    <span>🏠</span> Dashboard
                </NavLink>

                <NavLink to="/customers" className="nav-item">
                    <span>👥</span> Customers
                </NavLink>

                <NavLink to="/products" className="nav-item">
                    <span>📦</span> Products
                </NavLink>

                <NavLink to="/stores" className="nav-item">
                    <span>🏬</span> Stores
                </NavLink>

                <NavLink to="/sales" className="nav-item">
                    <span>💰</span> Sales
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;