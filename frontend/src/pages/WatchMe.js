// WatchMe.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import { FaHeart, FaComment } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const posts = [
  {
    username: "John",
    imageUrl: "/images/watchme1.avif", //"/images/trend2.png"
    caption: "Rocking my new summer outfit! #OOTD",
  },
  {
    username: "Lisa",
    imageUrl: "/images/watchme2.jpg",
    caption: "Beach vibes only 🌸🏖️ #BeachFashion",
  },
  {
    username: "Mike",
    imageUrl: "/images/watchme3.avif",
    caption: "City walk look 😎 #UrbanStyle",
  },
  {
    username: "Emma",
    imageUrl: "/images/watchme4.jpg",
    caption: "Sunset chic 🌅 #GoldenHourGlow",
  },
  {
    username: "Alex",
    imageUrl: "/images/watchme5.avif",
    caption: "Casual Saturday feels 👟 #RelaxedStyle",
  },
];

const WatchMe = () => {
  const [visibleComments, setVisibleComments] = useState({});

  const toggleComment = (index) => {
    setVisibleComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <Navbar /><br/><br/><br/><br/>
      <div className="container py-4">
        <h1 className="fw-bold mb-4">Watch Me</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {posts.map((post, idx) => (
            <div key={idx} className="col d-flex">
              <div className="card w-100 h-100 shadow-sm">
                <img
                  src={post.imageUrl}
                  className="card-img-top"
                  alt="fashion"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <FaHeart className="me-1" /> {post.username}
                  </h5>
                  <p className="card-text">{post.caption}</p>
                </div>
                <div className="card-footer d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-danger btn-sm w-50">
                      <FaHeart className="me-1" /> Like
                    </button>
                    <button
                      className="btn btn-outline-primary btn-sm w-50"
                      onClick={() => toggleComment(idx)}
                    >
                      <FaComment className="me-1" /> Comment
                    </button>
                  </div>
                  {visibleComments[idx] && (
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="form-control form-control-sm"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WatchMe;
