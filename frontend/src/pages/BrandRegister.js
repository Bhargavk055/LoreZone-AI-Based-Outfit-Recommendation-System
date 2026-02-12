import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerBg from "../components/Img/loginpage.jpg";


function BrandRegister() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        brandName: "",
        email: "",
        password: "",
        category: "Clothing"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            const payload = {
                username: formData.brandName,
                email: formData.email,
                password: formData.password,
                isBrandRegistration: true
            };

            const response = await fetch("http://localhost:8081/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                // AUTO-LOGIN: Save the new brand session immediately
                localStorage.setItem("userInfo", JSON.stringify(data));

                alert(`Account Created for ${formData.brandName}! \nWelcome to LoreZone!`);
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
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease"
        }}>
            <div style={{
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
            }}>
                {/* Left Side - Brand Registration Form */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "40px",
                    backgroundColor: "#1a1a1a",
                    color: "#fff"
                }}>
                    <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#fff", textAlign: "center" }}>BRAND PARTNER</h2>
                    <p style={{ textAlign: "center", marginBottom: "20px", color: "#aaa" }}>Create your official brand page</p>

                    <input type="text" name="brandName" placeholder="BRAND NAME" style={{
                        width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #333", borderRadius: "5px",
                        fontSize: "16px", backgroundColor: "#333", color: "#fff"
                    }} onChange={handleChange} />

                    <select name="category" style={{
                        width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #333", borderRadius: "5px",
                        fontSize: "16px", backgroundColor: "#333", color: "#fff"
                    }} onChange={handleChange} value={formData.category}>
                        <option value="Clothing">Clothing</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Jewelry">Jewelry</option>
                    </select>

                    <input type="email" name="email" placeholder="BUSINESS EMAIL" style={{
                        width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #333", borderRadius: "5px",
                        fontSize: "16px", backgroundColor: "#333", color: "#fff"
                    }} onChange={handleChange} />

                    <input type="password" name="password" placeholder="PASSWORD" style={{
                        width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #333", borderRadius: "5px",
                        fontSize: "16px", backgroundColor: "#333", color: "#fff"
                    }} onChange={handleChange} />

                    <button
                        style={{
                            width: "100%", padding: "12px", marginTop: "10px", borderRadius: "5px", border: "none", cursor: "pointer",
                            fontSize: "16px", background: "#D4AF37", color: "#000", fontWeight: "bold"
                        }}
                        onClick={handleRegister}
                    >
                        Create Brand Page
                    </button>

                    <button
                        style={{
                            width: "100%", padding: "12px", marginTop: "10px", borderRadius: "5px", border: "1px solid #333", cursor: "pointer",
                            fontSize: "16px", background: "transparent", color: "#aaa"
                        }}
                        onClick={() => navigate("/loginpage")}
                    >
                        Back to Login
                    </button>

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

export default BrandRegister;
