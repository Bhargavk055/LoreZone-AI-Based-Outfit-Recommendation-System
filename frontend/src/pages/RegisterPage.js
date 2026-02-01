import React from "react";
import { useNavigate } from "react-router-dom";
import registerBg from "../components/Img/loginpage.jpg";

function RegisterPage() {
  const navigate = useNavigate();

  const styles = {
    page: {
      height: "100vh",
      width: "100vw",
      backgroundColor: "#000", // Full-page black background
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      display: "flex",
      height: "80vh",
      width: "90%",
      maxWidth: "1000px",
      margin: "auto",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      borderRadius: "10px",
      overflow: "hidden",
      background: "#000",
    },
    leftSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "40px",
      backgroundColor: "#f5f5dc", // Cream color
      borderRadius: "10px 0 0 10px",
    },
    rightSection: {
      flex: 1,
      backgroundImage: `url(${registerBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#000",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      border: "1px solid #000",
      borderRadius: "5px",
      fontSize: "16px",
      backgroundColor: "#fff",
      color: "#000",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      transition: "0.3s",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    registerButton: {
      backgroundColor: "#000",
      color: "#fff",
    },
    loginButton: {
      backgroundColor: "#333",
      color: "#fff",
    },
    socialButtons: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "20px",
    },
    socialButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      border: "1px solid #000",
      backgroundColor: "#f5f5dc",
      transition: "0.3s",
      color: "#000",
    },
    googleButton: { color: "#db4437" },
    instagramButton: { color: "#c13584" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Left Side - Registration Form */}
        <div style={styles.leftSection}>
          <h2 style={styles.title}>REGISTER</h2>
          <input type="text" placeholder="FULL NAME" style={styles.input} />
          <input type="email" placeholder="EMAIL" style={styles.input} />
          <input type="password" placeholder="PASSWORD" style={styles.input} />

          <button style={{ ...styles.button, ...styles.registerButton }}>Register</button>
          <button
            style={{ ...styles.button, ...styles.loginButton }}
            onClick={() => navigate("/loginpage")}
          >
            Already have an account? Log In
          </button>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px", color: "#000" }}>Or</p>

          <div style={styles.socialButtons}>
            <button style={{ ...styles.socialButton, ...styles.googleButton }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google Logo"
                style={{ width: "20px", marginRight: "10px" }}
              />
              Continue with Google
            </button>
            <button style={{ ...styles.socialButton, ...styles.instagramButton }}>
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
        <div style={styles.rightSection}></div>
      </div>
    </div>
  );
}

export default RegisterPage;
