import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [scrolled, setScrolled] = useState(false);

  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (path) => {
    setActivePath(path);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top p-3 ${scrolled ? "shadow-lg" : ""}`}
      style={{
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.5)", // Transparent to Dark
        transition: "all 0.3s ease",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid #333" : "none"
      }}
    >
      <div className="container">
        {/* Brand Name */}
        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
          style={{
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#FFFFFF"
          }}
        >
          <span style={{ borderBottom: "2px solid #D4AF37" }}>LORE</span>
          <span>ZONE</span>
        </Link>

        {/* Navigation Buttons */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{
            backgroundColor: "transparent",
            borderColor: "#D4AF37",
            borderRadius: "5px",
          }}
        >
          <span className="navbar-toggler-icon" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")"
          }}></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-2">
            {[
              { name: "HOME", path: "/" },
              { name: "DREAM BIG", path: "/dream-big" },
              { name: "STYLE", path: "/watchdropstyle" },
              { name: "EVENTS", path: "/events" },
              { name: "TRENDS", path: "/trends" },
              { name: "WATCH ME", path: "/watchme" },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  className="nav-link"
                  to={item.path}
                  onClick={() => handleClick(item.path)}
                  style={{
                    padding: "6px 12px",
                    fontWeight: "500",
                    fontSize: "14px",
                    letterSpacing: "1px",
                    color: "#FFFFFF",
                    position: "relative",
                    transition: "all 0.2s ease",
                    textTransform: "uppercase",
                    opacity: activePath === item.path ? 1 : 0.8,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = "1";
                  }}
                  onMouseOut={(e) => {
                    if (activePath !== item.path) {
                      e.target.style.opacity = "0.8";
                    }
                  }}
                >
                  {item.name}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: activePath === item.path ? "80%" : "0",
                      height: "1px",
                      backgroundColor: "#D4AF37", // Gold accent
                      transition: "width 0.3s ease",
                      display: "block",
                    }}
                  />
                </Link>
              </li>
            ))}

            {localStorage.getItem("userInfo") ? (
              <li className="nav-item ms-2 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    padding: "6px 16px",
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#000000",
                    backgroundColor: "#D4AF37",
                    border: "1px solid #D4AF37",
                  }}
                >
                  {JSON.parse(localStorage.getItem("userInfo")).username}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  {(JSON.parse(localStorage.getItem("userInfo")).isAdmin === 1 || JSON.parse(localStorage.getItem("userInfo")).isAdmin === true) && (
                    <li><Link className="dropdown-item" to="/admin">Admin Dashboard 👑</Link></li>
                  )}
                  {(JSON.parse(localStorage.getItem("userInfo")).username.startsWith("[BRAND]") || (JSON.parse(localStorage.getItem("userInfo")).subscription_plan && JSON.parse(localStorage.getItem("userInfo")).subscription_plan !== "STARTER")) && (
                    <li><Link className="dropdown-item" to="/brand-dashboard">Brand Dashboard 🏷️</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        localStorage.removeItem("userInfo");
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item ms-2">
                <Link
                  className="nav-link"
                  to="/login"
                  style={{
                    padding: "6px 16px",
                    fontWeight: "500",
                    fontSize: "14px",
                    letterSpacing: "1px",
                    color: "#000000",
                    backgroundColor: "#D4AF37",
                    border: "1px solid #D4AF37",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#D4AF37";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#D4AF37";
                    e.target.style.color = "#000000";
                  }}
                >
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
