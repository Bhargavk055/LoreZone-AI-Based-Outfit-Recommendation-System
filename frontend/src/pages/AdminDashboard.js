import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPosts: 0,
        totalEvents: 0,
        totalBrands: 0,
    });
    const [users, setUsers] = useState([]);
    const [trends, setTrends] = useState([]);
    const [view, setView] = useState("stats"); // stats, users, trends

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const token = userInfo ? userInfo.token : null;
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const resStats = await fetch("http://localhost:8081/api/admin/stats", config);
            const dataStats = await resStats.json();
            setStats(dataStats);

            const resUsers = await fetch("http://localhost:8081/api/admin/users", config);
            const dataUsers = await resUsers.json();
            setUsers(dataUsers);

            const resTrends = await fetch("http://localhost:8081/api/admin/trends", config);
            const dataTrends = await resTrends.json();
            setTrends(dataTrends);

        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };

    const dynamicStyles = {
        container: {
            padding: "40px",
            minHeight: "100vh",
            background: "#000",
            color: "#fff",
            transition: "all 0.3s ease"
        },
        title: {
            fontSize: "3rem",
            marginBottom: "30px",
            textAlign: "center",
            borderBottom: "2px solid #D4AF37",
            paddingBottom: "10px",
            color: "#D4AF37"
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
        },
        card: {
            background: "#1a1a1a",
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            border: "1px solid #333"
        },
        number: {
            fontSize: "4rem",
            fontWeight: "bold",
            color: "#D4AF37",
        },
        label: {
            fontSize: "1.2rem",
            marginTop: "10px",
            color: "#aaa",
        },
        backButton: {
            display: "block",
            width: "fit-content",
            margin: "0 auto",
            padding: "10px 20px",
            background: "#D4AF37",
            color: "#000",
            textDecoration: "none",
            fontWeight: "bold",
            borderRadius: "5px",
        }
    };

    const handleVerifyUser = async (id) => {
        if (!window.confirm("Verify this user/brand?")) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            await fetch(`http://localhost:8081/api/admin/users/${id}/verify`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            alert("Verified!");
            fetchStats(); // Refresh data
        } catch (error) {
            console.error("Error verifying:", error);
        }
    };

    const handleDeleteUser = async (user) => {
        const isTargetAdmin = user.isAdmin;
        let confirmMsg = "ARE YOU SURE? This will permanently ban/delete this user.";

        if (isTargetAdmin) {
            confirmMsg = "⚠️ CRITICAL WARNING: You are about to delete an ADMINISTRATOR.\n\nThis action cannot be undone.";
        }

        if (!window.confirm(confirmMsg)) return;

        if (isTargetAdmin) {
            const reason = prompt("Security Check 1/2: Please enter a REASON for removing this Admin:");
            if (!reason || reason.trim().length < 5) {
                alert("Deletion Cancelled: A valid reason is required.");
                return;
            }

            const confirmName = prompt(`Security Check 2/2: To confirm, type the exact username: '${user.username}'`);
            if (confirmName !== user.username) {
                alert("Deletion Cancelled: Username did not match.");
                return;
            }
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            await fetch(`http://localhost:8081/api/admin/users/${user.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            alert("User/Admin Deleted Successfully.");
            fetchStats(); // Refresh data
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    const handleDeleteTrend = async (id) => {
        if (!window.confirm("Remove this trend post?")) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            await fetch(`http://localhost:8081/api/admin/trends/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            alert("Trend Removed!");
            fetchStats(); // Refresh data
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    // ... (render logic)

    return (
        <div style={dynamicStyles.container}>
            <h1 style={dynamicStyles.title}>Admin Dashboard - Manager Mode</h1>

            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <button onClick={() => setView("stats")} style={{ margin: "0 10px", padding: "10px 20px", background: view === "stats" ? "#D4AF37" : "#333", border: "none", color: view === "stats" ? "#000" : "#fff", cursor: "pointer", borderRadius: "5px" }}>Overview</button>
                <button onClick={() => setView("users")} style={{ margin: "0 10px", padding: "10px 20px", background: view === "users" ? "#D4AF37" : "#333", border: "none", color: view === "users" ? "#000" : "#fff", cursor: "pointer", borderRadius: "5px" }}>Manage Users</button>
                <button onClick={() => setView("trends")} style={{ margin: "0 10px", padding: "10px 20px", background: view === "trends" ? "#D4AF37" : "#333", border: "none", color: view === "trends" ? "#000" : "#fff", cursor: "pointer", borderRadius: "5px" }}>Manage Trends</button>
            </div>

            {view === "stats" && (
                <div style={dynamicStyles.grid}>
                    <div style={dynamicStyles.card}>
                        <div style={dynamicStyles.number}>{stats.totalUsers}</div>
                        <div style={dynamicStyles.label}>Total Users</div>
                    </div>
                    <div style={dynamicStyles.card}>
                        <div style={dynamicStyles.number}>{stats.totalPosts}</div>
                        <div style={dynamicStyles.label}>Style Posts</div>
                    </div>
                    <div style={dynamicStyles.card}>
                        <div style={dynamicStyles.number}>{stats.totalEvents}</div>
                        <div style={dynamicStyles.label}>Active Events</div>
                    </div>
                    <div style={dynamicStyles.card}>
                        <div style={dynamicStyles.number}>{stats.totalBrands}</div>
                        <div style={dynamicStyles.label}>Brands</div>
                    </div>
                </div>
            )}

            {view === "users" && (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff", minWidth: "600px" }}>
                        <thead>
                            <tr style={{ background: "#333", color: "#D4AF37" }}>
                                <th style={{ padding: "15px", textAlign: "left" }}>ID</th>
                                <th style={{ padding: "15px", textAlign: "left" }}>Username</th>
                                <th style={{ padding: "15px", textAlign: "left" }}>Email</th>
                                <th style={{ padding: "15px", textAlign: "left" }}>Plan</th>
                                <th style={{ padding: "15px", textAlign: "left" }}>Status</th>
                                <th style={{ padding: "15px", textAlign: "left" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: "1px solid #333" }}>
                                    <td style={{ padding: "15px" }}>{user.id}</td>
                                    <td style={{ padding: "15px" }}>{user.username} {user.isAdmin ? "🛡️" : ""}</td>
                                    <td style={{ padding: "15px" }}>{user.email}</td>
                                    <td style={{ padding: "15px" }}>
                                        <span style={{
                                            background: user.subscription_plan === "EMPIRE" ? "#D4AF37" : (user.subscription_plan === "PROFESSIONAL" ? "#00d2ff" : "#555"),
                                            color: "#000", padding: "3px 8px", borderRadius: "3px", fontSize: "0.8rem", fontWeight: "bold"
                                        }}>
                                            {user.subscription_plan || "STARTER"}
                                        </span>
                                    </td>
                                    <td style={{ padding: "15px" }}>{user.is_verified ? "✅ Verified" : "Unverified"}</td>
                                    <td style={{ padding: "15px" }}>
                                        {!user.is_verified && !user.isAdmin && (
                                            <button onClick={() => handleVerifyUser(user.id)} style={{ marginRight: "10px", background: "#00d2ff", border: "none", borderRadius: "3px", cursor: "pointer", padding: "5px 10px" }}>
                                                Verify
                                            </button>
                                        )}
                                        {/* Allow deleting anyone EXCEPT yourself */}
                                        {user.id !== (JSON.parse(localStorage.getItem("userInfo"))._id || JSON.parse(localStorage.getItem("userInfo")).id) && (
                                            <button onClick={() => handleDeleteUser(user)} style={{ background: "#d9534f", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer", padding: "5px 10px" }}>
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {view === "trends" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                    {trends.map(trend => (
                        <div key={trend.id} style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
                            <button
                                onClick={() => handleDeleteTrend(trend.id)}
                                style={{
                                    position: "absolute", top: "10px", right: "10px",
                                    background: "red", color: "white", border: "none",
                                    borderRadius: "50%", width: "30px", height: "30px",
                                    cursor: "pointer", fontWeight: "bold"
                                }}>
                                X
                            </button>
                            <div style={{ height: "150px", overflow: "hidden" }}>
                                <img src={trend.style_pic_url} alt={trend.style_name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x400?text=No+Image" }} />
                            </div>
                            <div style={{ padding: "15px" }}>
                                <h4 style={{ color: "#D4AF37", margin: "0 0 5px 0" }}>{trend.style_name}</h4>
                                <p style={{ color: "#aaa", fontSize: "0.8rem", margin: "0 0 10px 0" }}>By <strong>{trend.brand_name}</strong></p>
                                <span style={{ background: "#333", color: "#fff", padding: "2px 6px", borderRadius: "3px", fontSize: "0.7rem" }}>{trend.trend_type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <br />
            <Link to="/" style={dynamicStyles.backButton}>Back to Home</Link>
        </div>
    );
}

export default AdminDashboard;
