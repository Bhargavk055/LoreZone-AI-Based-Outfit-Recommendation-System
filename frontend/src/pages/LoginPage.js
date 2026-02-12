import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1HtRhB6yyB6OkAcWk78AtyRM-MLg",
  authDomain: "cloud-5f7d8.firebaseapp.com",
  projectId: "cloud-5f7d8",
  storageBucket: "cloud-5f7d8.firebasestorage.app",
  messagingSenderId: "766500561144",
  appId: "1:766500561144:web:d8d3481482c097fe595b0d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function LoginPage() {
  const navigate = useNavigate();
  const [, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google Sign-In Function
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // setUser(result.user);
      alert(`Welcome, ${result.user.displayName}!`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Sign-in failed! Check the console for details.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        alert(`Welcome back, ${data.username}!`);

        // Redirect based on role or default to home/dashboard
        // UNIFIED REDIRECT: Everyone goes to Home Page
        window.location.href = "/";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong.");
    }
  };


  return (
    <div style={{
      background: "#000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      transition: "all 0.3s ease",
      width: "100vw"
    }}>
      <div style={{
        background: "#1a1a1a",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        width: "350px",
        textAlign: "center",
        border: "1px solid #333"
      }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#FFFFFF" }}>Welcome Back</h2>
        <input
          type="text"
          placeholder="Email or Username"
          style={{
            width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #333", borderRadius: "5px",
            background: "#333", color: "#fff"
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #333", borderRadius: "5px",
            background: "#333", color: "#fff"
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
          style={{ fontSize: "14px", color: "#aaa", cursor: "pointer" }}
          onClick={async () => {
            const resetEmail = prompt("Enter your email to reset password:");
            if (resetEmail) {
              // ...
            }
          }}
        >
          Forgot Password?
        </p>

        <button style={{
          width: "100%", padding: "12px", marginTop: "10px", borderRadius: "5px", border: "none", cursor: "pointer", fontSize: "16px",
          background: "#D4AF37", color: "#000"
        }} onClick={handleLogin}>Log In</button>
        <button style={{
          width: "100%", padding: "12px", marginTop: "10px", borderRadius: "5px", border: "1px solid #555", cursor: "pointer", fontSize: "16px",
          background: "transparent", color: "#aaa"
        }} onClick={() => navigate("/registerpage")}>
          Register
        </button>

        <p style={{ marginTop: "20px", fontSize: "16px", color: "#aaa" }}>Or</p>

        <button style={{
          display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "12px", borderRadius: "5px", cursor: "pointer", fontSize: "16px", border: "none",
          background: "#fff", color: "#000", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
        }} onClick={signInWithGoogle}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
            style={{ width: "20px", marginRight: "10px" }}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
