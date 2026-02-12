import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";


const PostPage = () => {
  // ... (state and useEffect remain same)
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    pic_file: null,
    skin_tone: "",
    height: "",
    gender: "",
    body_type: "",
    occasion: "",
    theme: "",
    price: "",
    post_description: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/userposts/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, pic_file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    try {
      await axios.post("http://localhost:8081/api/userposts/posts", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchPosts();
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const dynamicStyles = {
    container: { backgroundColor: "#000", color: "#fff", minHeight: "100vh", padding: "20px", transition: "all 0.3s ease" },
    formContainer: { maxWidth: "500px", margin: "auto", backgroundColor: "#1a1a1a", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", border: "1px solid #333" },
    heading: { textAlign: "center", color: "#D4AF37" },
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    input: { padding: "10px", borderRadius: "5px", border: "1px solid #333", backgroundColor: "#000", color: "#fff" },
    textarea: { padding: "10px", borderRadius: "5px", height: "80px", border: "1px solid #333", backgroundColor: "#000", color: "#fff" },
    button: { backgroundColor: "#D4AF37", color: "#000", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
    postGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" },
    postCard: { backgroundColor: "#1a1a1a", padding: "10px", borderRadius: "10px", textAlign: "center", boxShadow: "0 0 10px rgba(0,0,0,0.1)", border: "1px solid #333" },
    image: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" },
  };

  return (
    <div style={dynamicStyles.container}>

      <Navbar />
      <br /><br /><br /><br /><br />

      <div style={dynamicStyles.formContainer}>
        <h2 style={dynamicStyles.heading}>Create a Post</h2>
        <form onSubmit={handleSubmit} style={dynamicStyles.form}>
          <input style={dynamicStyles.input} type="number" name="user_id" placeholder="User ID" value={formData.user_id} onChange={handleChange} required />
          <input style={dynamicStyles.input} type="file" name="pic_file" onChange={handleFileChange} required />

          <select name="skin_tone" style={dynamicStyles.input} value={formData.skin_tone} onChange={handleChange} required>
            <option value="">Select Skin Tone</option>
            <option>Fair</option>
            <option>Medium</option>
            <option>Olive</option>
            <option>Dark</option>
          </select>

          <input style={dynamicStyles.input} type="number" name="height" placeholder="Enter Height (cm)" value={formData.height} onChange={handleChange} required />

          <select name="gender" style={dynamicStyles.input} value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select name="body_type" style={dynamicStyles.input} value={formData.body_type} onChange={handleChange} required>
            <option value="">Select Body Type</option>
            <option>Hourglass</option>
            <option>Pear</option>
            <option>Athletic</option>
            <option>Apple</option>
            <option>Rectangle</option>
          </select>

          <select name="occasion" style={dynamicStyles.input} value={formData.occasion} onChange={handleChange} required>
            <option value="">Select Occasion</option>
            <option>Party</option>
            <option>Date</option>
            <option>Wedding</option>
            <option>Work</option>
            <option>Casual</option>
            <option>Street Style</option>
            <option>Formal</option>
            <option>Vacation</option>
          </select>

          <select name="theme" style={dynamicStyles.input} value={formData.theme} onChange={handleChange} required>
            <option value="">Select Theme</option>
            <option>Nature</option>
            <option>Retro</option>
            <option>City</option>
            <option>Classic</option>
            <option>Vintage</option>
          </select>

          <textarea style={dynamicStyles.textarea} name="post_description" placeholder="Post Description" value={formData.post_description} onChange={handleChange} required></textarea>

          <button style={dynamicStyles.button}>Submit</button>
        </form>
      </div>

      <h2 style={dynamicStyles.heading}>All Posts</h2>
      <div style={dynamicStyles.postGrid}>
        {posts.map((post) => (
          <div key={post.post_id} style={dynamicStyles.postCard}>
            <img style={dynamicStyles.image} src={`http://localhost:8081${post.pic_url}`} alt="Post" />
            <p><strong>Occasion:</strong> {post.occasion}</p>
            <p><strong>Theme:</strong> {post.theme}</p>
            <p><strong>Likes:</strong> {post.likes_count}</p>
            <button style={dynamicStyles.button}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
