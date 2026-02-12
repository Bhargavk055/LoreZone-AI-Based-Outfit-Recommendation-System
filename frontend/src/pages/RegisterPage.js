import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerBg from "../components/Img/loginpage.jpg";

function RegisterPage() {
  const navigate = useNavigate();

  const pageStyle = {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease"
  };

  const containerStyle = {
    display: "flex",
    height: "80vh",
    width: "90%",
    maxWidth: "1000px",
    margin: "auto",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#1a1a1a",
    border: "1px solid #333"
  };

  const leftSectionStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: "10px 0 0 10px",
  };

  const inputStyle = {
    width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #333", borderRadius: "5px",
    fontSize: "16px", backgroundColor: "#333", color: "#fff"
  };

  const titleStyle = {
    fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#fff", textAlign: "center"
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // AUTO-LOGIN: Save session
        localStorage.setItem("userInfo", JSON.stringify(data));
        alert("Registration successful! Welcome to LoreZone!");
        navigate("/");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* Left Side - Registration Form */}
        <div style={leftSectionStyle}>
          <h2 style={titleStyle}>REGISTER</h2>
          <input type="text" name="username" placeholder="FULL NAME" style={inputStyle} onChange={handleChange} />
          <input type="email" name="email" placeholder="EMAIL" style={inputStyle} onChange={handleChange} />
          <input type="password" name="password" placeholder="PASSWORD" style={inputStyle} onChange={handleChange} />

          <button
            style={{
              width: "100%", padding: "12px", marginTop: "10px", borderRadius: "5px", border: "none", cursor: "pointer", fontSize: "16px",
              background: "#D4AF37", color: "#000", fontWeight: "bold"
            }}
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            style={{
              width: "100%", padding: "12px", marginTop: "10px", borderRadius: "5px", border: "1px solid #555", cursor: "pointer", fontSize: "16px",
              background: "transparent", color: "#aaa"
            }}
            onClick={() => navigate("/loginpage")}
          >
            Already have an account? Log In
          </button>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px", color: "#aaa" }}>Or</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            {/* Social buttons can remain colorful */}
            <button style={{
              display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", borderRadius: "5px", cursor: "pointer", fontSize: "16px",
              border: "none", backgroundColor: "#fff", color: "#db4437"
            }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google Logo"
                style={{ width: "20px", marginRight: "10px" }}
              />
              Continue with Google
            </button>
            <button style={{
              display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", borderRadius: "5px", cursor: "pointer", fontSize: "16px",
              border: "none", backgroundColor: "#fff", color: "#c13584"
            }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram Logo"
                style={{ width: "20px", marginRight: "10px" }}
              />
              Continue with Instagram
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div style={{
          flex: 1,
          backgroundImage: `url(${registerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></div>
      </div>
    </div>
  );
}

export default RegisterPage;
