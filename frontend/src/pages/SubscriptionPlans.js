import React from "react";
import { useNavigate } from "react-router-dom";


function SubscriptionPlans() {
    const navigate = useNavigate();

    const handleSelectPlan = (planName, price) => {
        navigate("/payment", { state: { plan: planName, price: price } });
    };

    const dynamicStyles = {
        container: {
            minHeight: "100vh",
            background: "#000",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Segoe UI', sans-serif",
            transition: "all 0.3s ease"
        },
        title: {
            fontSize: "3rem",
            color: "#D4AF37",
            marginBottom: "10px",
            textAlign: "center"
        },
        subtitle: {
            color: "#aaa",
            marginBottom: "50px",
            fontSize: "1.2rem",
            textAlign: "center"
        },
        grid: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center"
        },
        card: {
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "15px",
            padding: "40px",
            width: "300px",
            textAlign: "center",
            transition: "transform 0.3s",
            position: "relative",
            color: "#fff"
        },
        planName: {
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#fff",
            marginBottom: "10px"
        },
        price: {
            fontSize: "2.5rem",
            color: "#D4AF37",
            fontWeight: "bold",
            marginBottom: "20px"
        },
        features: {
            listStyle: "none",
            padding: 0,
            textAlign: "left",
            marginBottom: "30px",
            lineHeight: "2",
            color: "#fff"
        },
        button: {
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "30px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem"
        }
    };

    return (
        <div style={dynamicStyles.container}>
            <h1 style={dynamicStyles.title}>Choose Your Brand Plan</h1>
            <p style={dynamicStyles.subtitle}>Unlock the power of LoreZone to showcase your trends.</p>

            {/* SKIP LINK FOR TRIAL */}
            <p style={{ marginBottom: "30px", cursor: "pointer", textDecoration: "underline", color: "#fff" }} onClick={() => navigate("/brand-dashboard")}>
                Skip for now (Continue with Free Brand Account) →
            </p>

            <div style={dynamicStyles.grid}>
                {/* BASIC PLAN */}
                <div style={dynamicStyles.card}>
                    <div style={dynamicStyles.planName}>STARTER</div>
                    <div style={dynamicStyles.price}>$49<span style={{ fontSize: "1rem" }}>/mo</span></div>
                    <ul style={dynamicStyles.features}>
                        <li>✅ Upload 5 Trends/Month</li>
                        <li>✅ Basic Brand Profile</li>
                        <li>❌ Customer Analytics</li>
                        <li>❌ AI Stylist Promotion</li>
                    </ul>
                    <button
                        style={{ ...dynamicStyles.button, background: "#aaa", color: "#000", border: `1px solid #aaa` }}
                        onClick={() => handleSelectPlan("STARTER", "$49")}
                    >
                        Select Starter
                    </button>
                </div>

                {/* PRO PLAN */}
                <div style={{ ...dynamicStyles.card, border: `2px solid #D4AF37`, transform: "scale(1.05)" }}>
                    <div style={{ position: "absolute", top: "-15px", left: "50%", transform: "translateX(-50%)", background: "#D4AF37", color: "#000", padding: "5px 15px", borderRadius: "10px", fontWeight: "bold" }}>MOST POPULAR</div>
                    <div style={dynamicStyles.planName}>PROFESSIONAL</div>
                    <div style={dynamicStyles.price}>$199<span style={{ fontSize: "1rem" }}>/mo</span></div>
                    <ul style={dynamicStyles.features}>
                        <li>✅ Upload 50 Trends/Month</li>
                        <li>✅ Verified Brand Badge 🛡️</li>
                        <li>✅ Basic Analytics</li>
                        <li>✅ In-Feed Recommendations</li>
                    </ul>
                    <button
                        style={{ ...dynamicStyles.button, background: "#D4AF37", color: "#000" }}
                        onClick={() => handleSelectPlan("PROFESSIONAL", "$199")}
                    >
                        Select Pro
                    </button>
                </div>

                {/* ENTERPRISE PLAN */}
                <div style={dynamicStyles.card}>
                    <div style={dynamicStyles.planName}>EMPIRE</div>
                    <div style={dynamicStyles.price}>$499<span style={{ fontSize: "1rem" }}>/mo</span></div>
                    <ul style={dynamicStyles.features}>
                        <li>✅ Unlimited Trends</li>
                        <li>✅ Gold Brand Profile 👑</li>
                        <li>✅ Full Customer Insights</li>
                        <li>✅ AI "Smart Match" Priority</li>
                    </ul>
                    <button
                        style={{ ...dynamicStyles.button, background: "#fff", color: "#000" }}
                        onClick={() => handleSelectPlan("EMPIRE", "$499")}
                    >
                        Select Empire
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPlans;
