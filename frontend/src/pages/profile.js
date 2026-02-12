import React from "react";
import { Link } from "react-router-dom";

function Profile() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
        window.location.href = "/login";
        return null;
    }

    const isBrand = userInfo.username.startsWith("[BRAND]") || (userInfo.subscription_plan && userInfo.subscription_plan !== "STARTER");

    const isAdmin =
        userInfo.email === "admin@lorezone.com" ||
        userInfo.username === "admin" ||
        !!userInfo.isAdmin;

    // STYLES
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

    // 👑 ADMIN THEME (Dark Red/Black "Command Center")
    const adminStyles = {
        container: {
            ...commonStyles.container,
            background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", // Deep Space Blue/Purple
            color: "#fff",
        },
        card: {
            background: "rgba(0, 0, 0, 0.8)",
            border: "2px solid #00d2ff", // Neon Blue Border
            boxShadow: "0 0 20px #00d2ff", // Neon Glow
            maxWidth: "800px", // Wider for Admin
            margin: "0 auto",
            padding: "50px",
            borderRadius: "10px",
        },
        title: { fontSize: "3rem", fontWeight: "900", color: "#00d2ff", textTransform: "uppercase", letterSpacing: "3px" },
        badge: { background: "#00d2ff", color: "#000", padding: "5px 10px", borderRadius: "5px", fontSize: "1rem", verticalAlign: "middle", marginLeft: "10px" },
        section: { borderTop: "1px solid #00d2ff", marginTop: "30px", paddingTop: "30px" },
        button: { background: "#00d2ff", color: "#000", padding: "15px 30px", fontWeight: "bold", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1.2rem" }
    };

    // 👤 USER/BRAND THEME (Clean Dark Mode)
    const userStyles = {
        container: {
            ...commonStyles.container,
            background: "#000", // Static Dark
            color: "#fff",      // Static White
        },
        card: {
            background: "#1a1a1a",     // Static Card Dark
            maxWidth: "500px",
            margin: "0 auto",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        },
        title: { fontSize: "2rem", fontWeight: "bold", color: "#D4AF37" }, // Gold
        badge: { display: "none" },
        section: { borderTop: "1px solid #333", marginTop: "30px", paddingTop: "30px" },
        button: { background: "#D4AF37", color: "#000", padding: "10px 20px", fontWeight: "bold", border: "none", borderRadius: "20px", cursor: "pointer", fontSize: "1rem" }
    };

    // Select active theme
    const theme = isAdmin ? adminStyles : userStyles;

    return (
        <div style={theme.container}>
            <Link to="/" style={commonStyles.backLink}>← Return Home</Link>
            <div style={{ clear: "both" }}></div>
            <br />

            <div style={theme.card}>
                <div style={{ fontSize: "80px", marginBottom: "20px" }}>
                    {isAdmin ? "🛡️" : (isBrand ? "🏢" : "👤")}
                </div>

                <h1 style={theme.title}>
                    {isAdmin ? "SYSTEM ADMIN" : userInfo.username}
                    {isAdmin && <span style={theme.badge}>VERIFIED</span>}
                </h1>

                {!isAdmin && <p style={{ color: "#888", fontStyle: "italic" }}>{userInfo.email}</p>}

                {/* ADMIN CONTENT */}
                {isAdmin && (
                    <div style={theme.section}>
                        <h3 style={{ color: "#00d2ff" }}>COMMAND CENTER</h3>
                        <p>Welcome, {userInfo.username}. Full system access granted.</p>
                        <br />
                        <Link to="/admin" style={{ ...theme.button, textDecoration: "none" }}>
                            ⚡ ACCESS DASHBOARD
                        </Link>
                    </div>
                )}

                {/* BRAND CONTENT - Redirect to Dashboard */}
                {isBrand && (
                    <div style={theme.section}>
                        <h3>🏷️ Brand Identity</h3>
                        <p style={{ color: "#aaa" }}>This is your public profile overview.</p>

                        <Link to="/brand-dashboard" style={{ textDecoration: "none" }}>
                            <button style={{ ...theme.button, background: "#D4AF37", color: "#000", marginTop: "20px" }}>
                                🚀 Go to Brand Dashboard
                            </button>
                        </Link>
                    </div>
                )}

                {/* NORMAL USER CONTENT (Mini Instagram) */}
                {!isBrand && !isAdmin && (
                    <div style={theme.section}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                            <h3>Your Wardrobe</h3>
                            <button
                                onClick={async () => {
                                    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                                    try {
                                        const res = await fetch("http://localhost:8081/api/user/privacy", {
                                            method: "POST",
                                            headers: { "Authorization": `Bearer ${userInfo.token}` }
                                        });
                                        const data = await res.json();
                                        alert(data.message);
                                        // Update local storage to reflect change
                                        userInfo.is_private = data.is_private;
                                        localStorage.setItem("userInfo", JSON.stringify(userInfo));
                                        window.location.reload();
                                    } catch (e) { alert("Error updating privacy"); }
                                }}
                                style={{ background: "#333", color: "#fff", border: "1px solid #555", padding: "5px 15px", borderRadius: "20px", cursor: "pointer", fontSize: "0.9rem" }}
                            >
                                {userInfo.is_private ? "🔒 Private Account" : "🌍 Public Account"}
                            </button>
                        </div>

                        {/* STATS */}
                        <div style={{ display: "flex", gap: "30px", justifyContent: "center", marginBottom: "30px" }}>
                            <div>
                                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#D4AF37" }}>0</div>
                                <div style={{ color: "#aaa", fontSize: "0.9rem" }}>Posts</div>
                            </div>
                            <div>
                                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#D4AF37" }}>0</div>
                                <div style={{ color: "#aaa", fontSize: "0.9rem" }}>Followers</div>
                            </div>
                            <div>
                                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#D4AF37" }}>0</div>
                                <div style={{ color: "#aaa", fontSize: "0.9rem" }}>Following</div>
                            </div>
                        </div>

                        <p>Curate your style and view matches.</p>
                        <Link to="/watchme" style={{ ...theme.button, textDecoration: "none" }}>
                            + Share New Look
                        </Link>

                        <div style={{ marginTop: "40px", borderTop: "1px solid #333", paddingTop: "20px" }}>
                            <h4 style={{ color: "#aaa", marginBottom: "20px" }}>My Posts</h4>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
                                {/* Placeholder for user posts - in real app would fetch from API */}
                                <div style={{ aspectRatio: "1/1", background: "#222" }}></div>
                                <div style={{ aspectRatio: "1/1", background: "#222" }}></div>
                                <div style={{ aspectRatio: "1/1", background: "#222" }}></div>
                                <div style={{ aspectRatio: "1/1", background: "#222" }}></div>
                                <div style={{ aspectRatio: "1/1", background: "#222" }}></div>
                                <div style={{ aspectRatio: "1/1", background: "#222" }}></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* LOGOUT */}
                <div style={theme.section}>
                    <button
                        style={{
                            background: "transparent",
                            color: "#d9534f", // Always Red
                            border: "1px solid #d9534f", // Always Red
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            opacity: 0.8
                        }}
                        onClick={() => {
                            localStorage.removeItem("userInfo");
                            window.location.href = "/";
                        }}
                    >
                        LOGOUT SESSION
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
