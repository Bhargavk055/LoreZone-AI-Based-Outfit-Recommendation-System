"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const location = useLocation()
  const [activePath, setActivePath] = useState(location.pathname)
  const [scrolled, setScrolled] = useState(false)

  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname)
  }, [location])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleClick = (path) => {
    setActivePath(path)
  }

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top p-3 ${scrolled ? "shadow-lg" : "shadow-sm"}`}
      style={{
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.85)",
        transition: "all 0.3s ease",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container">
        {/* Brand Name */}
        <Link
          className="navbar-brand fw-bold text-white fs-3"
          to="/"
          style={{
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "2px",
            textTransform: "uppercase",
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
            borderRadius: "0",
          }}
        >
          <span className="navbar-toggler-icon"></span>
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
                    opacity: activePath === item.path ? 1 : 0.7,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = "1"
                  }}
                  onMouseOut={(e) => {
                    if (activePath !== item.path) {
                      e.target.style.opacity = "0.7"
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
                  backgroundColor: "#D4AF37", // Gold button for login
                  border: "1px solid #D4AF37",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "transparent"
                  e.target.style.color = "#D4AF37"
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#D4AF37"
                  e.target.style.color = "#000000"
                }}
              >
                LOGIN
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

