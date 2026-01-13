import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="page-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
