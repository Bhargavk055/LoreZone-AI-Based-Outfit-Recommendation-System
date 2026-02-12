import React from "react";
import { Link } from "react-router-dom";

function BrandDashboard() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
        window.location.href = "/login";
        return null;
    }

    const commonStyles = {
        container: {
            minHeight: "100vh",
            padding: "50px 20px",
            textAlign: "center",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        },
        backLink: {
            color: "#fff",
            float: "left",
            textDecoration: "none",
            fontSize: "1.2rem",
            fontWeight: "bold"
        }
    };

    const dashboardStyles = {
        container: {
            ...commonStyles.container,
            background: "linear-gradient(135deg, #1c1c1c, #2a2a2a, #000)",
            color: "#fff",
        },
        card: {
            background: "#1a1a1a",
            maxWidth: "800px",
            margin: "0 auto",
            padding: "50px",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            border: "1px solid #333"
        },
        title: { fontSize: "2.5rem", fontWeight: "bold", color: "#D4AF37", marginBottom: "30px" },
        section: { borderTop: "1px solid #333", marginTop: "30px", paddingTop: "30px" },
        button: { background: "#D4AF37", color: "#000", padding: "15px 30px", fontWeight: "bold", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1.2rem", margin: "10px" }
    };

    return (
        <div style={dashboardStyles.container}>
            <Link to="/" style={commonStyles.backLink}>← Return Home</Link>
            <div style={{ clear: "both" }}></div>
            <br />

            <div style={dashboardStyles.card}>
                <div style={{ fontSize: "60px", marginBottom: "20px" }}>🏷️</div>
                <h1 style={dashboardStyles.title}>BRAND DASHBOARD</h1>
                <p style={{ color: "#aaa" }}>Manage your brand presence on LoreZone</p>

                <div style={dashboardStyles.section}>
                    <h3>Subscription Status</h3>
                    <div style={{ background: "#333", padding: "15px", borderRadius: "5px", marginBottom: "15px", display: "inline-block", marginTop: "10px" }}>
                        <span style={{ color: "#aaa", fontSize: "1rem" }}>CURRENT PLAN: </span>
                        <span style={{ color: "#D4AF37", fontWeight: "bold", fontSize: "1.2rem", marginLeft: "10px" }}>
                            {(userInfo.subscription_plan || "STARTER").toUpperCase()} (Active)
                        </span>
                        <Link to="/subscription-plans" style={{ display: "block", marginTop: "10px", color: "#00d2ff", textDecoration: "none", fontSize: "0.9rem" }}>
                            Manage / Upgrade Plan
                        </Link>
                    </div>
                </div>

                <div style={dashboardStyles.section}>
                    <h3>Quick Actions</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
                        <Link to="/brand-upload">
                            <button style={{ ...dashboardStyles.button, background: "#333", color: "#fff", border: "1px solid #555" }}>
                                + Upload New Product
                            </button>
                        </Link>
                        <Link to="/insights">
                            <button style={{ ...dashboardStyles.button, background: "#333", color: "#fff", border: "1px solid #555" }}>
                                📊 View Insights
                            </button>
                        </Link>
                        <Link to="/profile">
                            <button style={{ ...dashboardStyles.button, background: "transparent", color: "#aaa", border: "1px solid #333" }}>
                                View Profile Page
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BrandDashboard;
