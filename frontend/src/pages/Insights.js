import React from "react";
import { Link } from "react-router-dom";

function Insights() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const plan = userInfo?.subscription_plan || "STARTER";

    const commonStyles = {
        container: {
            minHeight: "100vh",
            padding: "50px 20px",
            background: "#000",
            color: "#fff",
            textAlign: "center",
            fontFamily: "'Segoe UI', sans-serif"
        },
        card: {
            background: "#1a1a1a",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
            display: "inline-block",
            margin: "20px",
            minWidth: "200px"
        },
        number: {
            fontSize: "3rem",
            color: "#D4AF37",
            fontWeight: "bold"
        },
        label: {
            color: "#aaa",
            marginTop: "10px"
        }
    };

    return (
        <div style={commonStyles.container}>
            <Link to="/profile" style={{ color: "#fff", float: "left", textDecoration: "none", fontWeight: "bold" }}>← Back to Profile</Link>
            <div style={{ clear: "both" }}></div>

            <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>📊 Brand Insights</h1>
            <p style={{ color: "#aaa", marginBottom: "40px" }}>Performance metrics for {userInfo?.username}</p>

            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                <div style={commonStyles.card}>
                    <div style={commonStyles.number}>1,245</div>
                    <div style={commonStyles.label}>Profile Views</div>
                </div>
                <div style={commonStyles.card}>
                    <div style={commonStyles.number}>85</div>
                    <div style={commonStyles.label}>Trend Clicks</div>
                </div>
                <div style={commonStyles.card}>
                    <div style={commonStyles.number}>12</div>
                    <div style={commonStyles.label}>Saved Items</div>
                </div>
            </div>

            <div style={{ marginTop: "50px", borderTop: "1px solid #333", paddingTop: "50px" }}>
                <h2 style={{ color: "#D4AF37" }}>Top Performing Trends</h2>
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
                    <div style={{ background: "#222", padding: "20px", borderRadius: "10px" }}>
                        <div style={{ width: "150px", height: "200px", background: "#333", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>IMAGE</div>
                        <h4>Summer Floral</h4>
                        <p style={{ color: "#aaa" }}>450 Views</p>
                    </div>
                    <div style={{ background: "#222", padding: "20px", borderRadius: "10px" }}>
                        <div style={{ width: "150px", height: "200px", background: "#333", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>IMAGE</div>
                        <h4>Winter Coat</h4>
                        <p style={{ color: "#aaa" }}>310 Views</p>
                    </div>
                </div>
            </div>

            {plan === "STARTER" && (
                <div style={{ marginTop: "50px", background: "#330000", padding: "20px", borderRadius: "10px", display: "inline-block" }}>
                    <h3 style={{ color: "#ff4444" }}>🔒 Unlock Advanced Analytics</h3>
                    <p>Upgrade to PROFESSIONAL to see detailed customer demographics.</p>
                    <Link to="/subscription-plans">
                        <button style={{ marginTop: "10px", padding: "10px 20px", background: "#D4AF37", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>Upgrade Now</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Insights;
