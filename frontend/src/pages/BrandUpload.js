import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BrandUpload() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        trend_type: "Summer",
        style_name: "",
        description: "",
        style_pic_url: ""
    });

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const token = userInfo ? userInfo.token : null;

            if (!token) {
                alert("Please log in as a Brand first!");
                navigate("/loginpage");
                return;
            }

            const data = new FormData();
            data.append('trend_type', formData.trend_type);
            data.append('style_name', formData.style_name);
            data.append('description', formData.description);
            if (formData.image) {
                data.append('image', formData.image);
            } else if (formData.style_pic_url) {
                data.append('style_pic_url', formData.style_pic_url);
            }

            const response = await fetch("http://localhost:8081/api/trend/trends", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                    // Content-Type is not needed for FormData, browser sets it automatically
                },
                body: data
            });

            if (response.ok) {
                alert("✅ Trend Uploaded Successfully!");
                navigate("/trends"); // Redirect to trends page to see the new post
            } else {
                const data = await response.json();
                alert(data.message || "Upload failed");
            }
        } catch (error) {
            console.error("Upload Error:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#000",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Segoe UI', sans-serif"
        }}>
            <div style={{
                background: "#1a1a1a",
                padding: "40px",
                borderRadius: "15px",
                width: "500px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                border: "1px solid #333"
            }}>
                <h2 style={{ color: "#D4AF37", textAlign: "center", marginBottom: "30px" }}>Upload New Trend</h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", color: "#aaa" }}>Trend Type</label>
                        <select
                            name="trend_type"
                            value={formData.trend_type}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px", background: "#333", border: "1px solid #555", color: "#fff", borderRadius: "5px" }}
                        >
                            <option value="Summer">Summer</option>
                            <option value="Winter">Winter</option>
                            <option value="Casual">Casual</option>
                            <option value="Formal">Formal</option>
                            <option value="Streetwear">Streetwear</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", color: "#aaa" }}>Style Name</label>
                        <input
                            type="text"
                            name="style_name"
                            placeholder="e.g. Floral Maxi Dress"
                            value={formData.style_name}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "10px", background: "#333", border: "1px solid #555", color: "#fff", borderRadius: "5px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", color: "#aaa" }}>Upload Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            style={{ width: "100%", padding: "10px", background: "#333", border: "1px solid #555", color: "#fff", borderRadius: "5px" }}
                        />
                        <p style={{ textAlign: "center", margin: "10px 0", color: "#aaa" }}>- OR -</p>
                        <input
                            type="text"
                            name="style_pic_url"
                            placeholder="Paste Image URL (Optional)"
                            value={formData.style_pic_url}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px", background: "#333", border: "1px solid #555", color: "#fff", borderRadius: "5px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "5px", color: "#aaa" }}>Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Describe the style..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "10px", background: "#333", border: "1px solid #555", color: "#fff", borderRadius: "5px" }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "#D4AF37",
                            color: "#000",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                    >
                        🚀 Launch Trend
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "10px",
                            background: "transparent",
                            color: "#aaa",
                            border: "1px solid #333",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BrandUpload;
