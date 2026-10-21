import { useEffect, useState } from "react";

function Dashboard() {
    const [counts, setCounts] = useState({
        customers: 0,
        products: 0,
        stores: 0,
        sales: 0
    });

    const [loading, setLoading] = useState(true);

    // ✅ FETCH DASHBOARD DATA
    useEffect(() => {
        fetch("https://localhost:7155/api/Dashboard")
            .then(res => res.json())
            .then(data => {
                setCounts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Dashboard error:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Welcome Admin 👋</h1>

            {loading ? (
                <p>Loading dashboard...</p>
            ) : (
                <div className="dashboard-cards">

                    <div className="card card-blue">
                        <div className="card-icon">👥</div>
                        <h3>Customers</h3>
                        <p>{counts.customers}</p>
                    </div>

                    <div className="card card-purple">
                        <div className="card-icon">📦</div>
                        <h3>Products</h3>
                        <p>{counts.products}</p>
                    </div>

                    <div className="card card-orange">
                        <div className="card-icon">🏬</div>
                        <h3>Stores</h3>
                        <p>{counts.stores}</p>
                    </div>

                    <div className="card card-green">
                        <div className="card-icon">💰</div>
                        <h3>Sales</h3>
                        <p>{counts.sales}</p>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Dashboard;