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

  // Google Sign-In Function
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert(`Welcome, ${result.user.displayName}!`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Sign-in failed! Check the console for details.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        <p style={styles.forgotPassword}>Forgot Password?</p>

        <button style={styles.loginButton}>Log In</button>
        <button style={styles.registerButton} onClick={() => navigate("/registerpage")}>
          Register
        </button>

        <p style={styles.orText}>Or</p>

        <button style={styles.googleButton} onClick={signInWithGoogle}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
            style={styles.googleLogo}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#1e1e1e",
  },
  card: {
    background: "#f5f5dc",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#1e1e1e",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #444",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
    background: "#222",
    color: "#f5f5dc",
  },
  forgotPassword: {
    fontSize: "14px",
    color: "#777",
    cursor: "pointer",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    background: "#1e1e1e",
    color: "#f5f5dc",
    transition: "all 0.3s ease-in-out",
  },
  registerButton: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    background: "#444",
    color: "#f5f5dc",
    transition: "all 0.3s ease-in-out",
  },
  orText: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#555",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    border: "none",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease-in-out",
  },
  googleLogo: {
    width: "20px",
    marginRight: "10px",
  },
};

export default LoginPage;
