// WatchMe.js
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FaHeart, FaComment } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const WatchMe = () => {
  const [posts, setPosts] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [comments, setComments] = useState({}); // Store comments for each post
  const [newComment, setNewComment] = useState({}); // Store new comment input for each post
  const [currentUser, setCurrentUser] = useState("Guest"); // Mock user for now

  // --- UPLOAD STATE ---
  const [showUpload, setShowUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadCaption, setUploadCaption] = useState("");

  // --- UPLOAD HANDLER ---
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("user_id", JSON.parse(localStorage.getItem("userInfo"))?.username || "Guest");
    formData.append("caption", uploadCaption);

    try {
      await axios.post("http://localhost:8081/api/watchme/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Style Shared Successfully!");
      setShowUpload(false);
      setUploadFile(null);
      setUploadCaption("");
      fetchPosts(); // Refresh feed
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload.");
    }
  };

  // Fetch Posts on Load
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/watchme/posts");
      setPosts(res.data);
      // Initialize comment fetches
      res.data.forEach(post => fetchComments(post.post_id));
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:8081/api/comments/${postId}`);
      setComments(prev => ({ ...prev, [postId]: res.data }));
    } catch (err) {
      console.error(`Error fetching comments for ${postId}:`, err);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`http://localhost:8081/api/watchme/posts/${postId}/like`, {});
      // Update local state to reflect new like count
      setPosts(posts.map(post =>
        post.post_id === postId ? { ...post, likes_count: res.data.likes_count } : post
      ));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleCommentSubmit = async (postId) => {
    const text = newComment[postId];
    if (!text) return;

    try {
      await axios.post("http://localhost:8081/api/comments/add", {
        post_id: postId,
        username: currentUser, // In real app, get from auth context
        comment_text: text
      });
      // Refresh comments and clear input
      fetchComments(postId);
      setNewComment(prev => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const toggleComment = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
      <Navbar /><br /><br /><br /><br />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold" style={{ color: "#D4AF37" }}>Watch Me - Community Styles</h1>
          <button className="btn btn-lg" style={{ background: "#D4AF37", color: "#000", fontWeight: "bold" }} onClick={() => setShowUpload(!showUpload)}>
            {showUpload ? "Close Upload" : "+ Share Your Style"}
          </button>
        </div>

        {/* UPLOAD FORM */}
        {showUpload && (
          <div className="card mb-4 p-4" style={{ background: "#1a1a1a", border: "1px solid #D4AF37" }}>
            <h3 style={{ color: "#fff" }}>Upload New Style</h3>
            <form onSubmit={handleUpload}>
              <input type="file" className="form-control mb-2" accept="image/*,video/*" onChange={(e) => setUploadFile(e.target.files[0])} required />
              <textarea className="form-control mb-2" placeholder="Caption your style..." value={uploadCaption} onChange={(e) => setUploadCaption(e.target.value)} required></textarea>
              <button type="submit" className="btn btn-primary">🚀 Post It</button>
            </form>
          </div>
        )}

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {posts.map((post) => (
            <div key={post.post_id} className="col d-flex">
              <div className="card w-100 h-100 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff", border: "1px solid #333" }}>

                {/* MEDIA RENDERER (Image or Video) */}
                {(() => {
                  let mediaUrl = post.pic_url || post.imageUrl;

                  // If it's a relative path AND it matches our new upload pattern (watchme_), use backend
                  // Otherwise, keep it as is (frontend public folder or external URL)
                  if (mediaUrl && !mediaUrl.startsWith('http') && mediaUrl.includes('watchme_')) {
                    mediaUrl = `http://localhost:8081${mediaUrl}`;
                  } else if (mediaUrl && !mediaUrl.startsWith('http') && !mediaUrl.startsWith('/')) {
                    // Fix for paths that might be missing leading slash
                    mediaUrl = `/${mediaUrl}`;
                  }

                  return post.media_type === 'video' ? (
                    <video
                      src={mediaUrl}
                      className="card-img-top"
                      controls
                      style={{ height: "400px", objectFit: "cover", backgroundColor: "#000" }}
                    />
                  ) : (
                    <img
                      src={mediaUrl}
                      className="card-img-top"
                      alt="fashion"
                      style={{ height: "400px", objectFit: "cover" }}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400?text=No+Image" }}
                    />
                  );
                })()}

                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#D4AF37", fontWeight: "bold" }}>
                    @{post.user_id || post.username || "Guest"}
                  </h5>
                  <p className="card-text" style={{ color: "#ccc" }}>{post.post_description || post.caption}</p>
                </div>
                <div className="card-footer d-flex flex-column gap-2" style={{ borderTop: "1px solid #333", backgroundColor: "#222" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-sm"
                      style={{ color: "#e11d48", borderColor: "#e11d48" }}
                      onClick={() => handleLike(post.post_id)}
                    >
                      <FaHeart className="me-1" /> {post.likes_count} Likes
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ color: "#D4AF37", borderColor: "#D4AF37" }}
                      onClick={() => toggleComment(post.post_id)}
                    >
                      <FaComment className="me-1" /> Comments ({comments[post.post_id]?.length || 0})
                    </button>
                  </div>

                  {visibleComments[post.post_id] && (
                    <div className="mt-2" style={{ borderTop: "1px solid #444", paddingTop: "10px" }}>
                      {/* List Comments */}
                      <div className="mb-2" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                        {comments[post.post_id]?.map(c => (
                          <div key={c.id} className="small border-bottom mb-1 pb-1" style={{ borderColor: "#444" }}>
                            <strong style={{ color: "#D4AF37" }}>{c.username}: </strong> {c.comment_text}
                          </div>
                        ))}
                      </div>
                      {/* Add Comment */}
                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          className="form-control"
                          style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                          value={newComment[post.post_id] || ""}
                          onChange={(e) => setNewComment({ ...newComment, [post.post_id]: e.target.value })}
                          onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.post_id)}
                        />
                        <button className="btn btn-primary" style={{ backgroundColor: "#D4AF37", borderColor: "#D4AF37", color: "#000", fontWeight: "bold" }} onClick={() => handleCommentSubmit(post.post_id)}>Post</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchMe;
