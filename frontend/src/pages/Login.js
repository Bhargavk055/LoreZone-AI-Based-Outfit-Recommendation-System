// ... imports
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Login() {
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#000000",
    color: "#FFFFFF",
    textAlign: "center",
    padding: "20px",
    transition: "all 0.3s ease",
    width: "100vw"
  };

  const headerStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#D4AF37", // Gold
    marginBottom: "15px",
  };

  const subtextStyle = {
    fontSize: "1.2rem",
    color: "#aaa",
    marginBottom: "30px",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
  };

  const cardStyle = {
    width: "350px",
    padding: "25px",
    borderRadius: "12px",
    background: "#1a1a1a",
    boxShadow: "0px 5px 15px rgba(255, 255, 255, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "1px solid #333"
  };

  const buttonStyle = {
    background: "#D4AF37",
    color: "#000",
    border: "none",
    padding: "12px 24px",
    margin: "10px",
    borderRadius: "30px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.2s ease",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Welcome to LoreZone – Your Trend Guide! ✨</h1>
      <p style={subtextStyle}>
        Stay ahead of the trends! Discover the hottest outfits that match your style.
      </p>

      <div style={rowStyle}>
        <div
          style={cardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <div style={{ fontSize: "40px", marginBottom: "10px" }}>👤</div>
          <div style={{ fontSize: "1rem", marginBottom: "20px", color: "#d3d3a4" }}>
            For Users: Login to explore personalized fashion recommendations.
          </div>
          <button
            style={buttonStyle}
            onClick={() => navigate("/loginpage")}
          >
            Login
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/registerpage")}
          >
            Register
          </button>
        </div>

        <div
          style={cardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <div style={{ fontSize: "40px", marginBottom: "10px" }}>🗞️</div>
          <div style={{ fontSize: "1rem", marginBottom: "20px", color: "#d3d3a4" }}>
            For Brands: Showcase your latest collections and connect with fashion-forward users.
          </div>
          <button
            style={buttonStyle}
            onClick={() => navigate("/loginpage")}
          >
            Login
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/brand-register")}
          >
            Register
          </button>
        </div>
      </div>

      <div style={{ marginTop: "40px", opacity: 0.7 }}>
        <span style={{ color: "#777", fontSize: "0.9rem" }}>Are you an Administrator? </span>
        <span
          style={{ color: "#D4AF37", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => navigate("/loginpage")}
        >
          Admin Portal
        </span>
      </div>
    </div>
  );
}

export default Login;
