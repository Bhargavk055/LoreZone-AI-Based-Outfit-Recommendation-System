"use client"

import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import axios from "axios"

function Home() {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("https://lorezone.onrender.com/api/brand/brands")
        setBrands(response.data)
      } catch (error) {
        console.error("Error fetching brands:", error)
      }
    }
    fetchBrands()
  }, [])

  const Brandsnearyou = () => {
    window.location.href = "/Brandsnearyou"; // Redirect to the "Brands Near You" page
  }

  const scrollToAbout = () => {
    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className="container-fluid px-4"
      // style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#FFFFF", paddingTop: "80px" }}
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#FFFFFF",
        paddingTop: "80px",
      }}
    >
      {/* <div className="mb-3">
        <Navbar /><br/><br/>
        <img
  src="/images/Logo.jpg"
  alt="Lore Zone Logo"
  className="img-fluid rounded shadow-lg"
  style={{ width: "1000px", height: "800px", objectFit: "cover" }}
/> */}
<div className="text-center">
    <Navbar />
    <br />
    <img
      src="/images/dheeraj.png"
      alt="Lore Zone Logo"
      style={{ width: "700px", height: "600px", objectFit: "cover" }}
    />
      </div>
      <div className="text-center">
        
        <button
          className="btn px-4 py-6 mt-3"
          style={{
            borderRadius: "30px",
            backgroundColor: "#000000",
            border: "1px solid #ffffff",
            fontWeight: "bold",
            color: "#ffffff",
          }}
          onClick={scrollToAbout}
        >
          Know about us
        </button>
      </div>

      {/* Featured Brands */}
      <section className="mt-5">
        <h2 className="text-center fw-bold" style={{ color: "#ffffff" }}>
          Featured Brands
        </h2>
        <p className="text-center" style={{ color: "#aaaaaa" }}>
          Best-selling styles across the world
        </p>
        <div className="row mt-4">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <div className="col-md-4 text-center" key={brand.company_id}>
                <div
                  className="card shadow-sm p-3 border-0"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "#111111",
                    border: "1px solid #333333",
                  }}
                >
                  <img
                    src={brand.logo_url || "https://via.placeholder.com/150"}
                    alt={brand.name}
                    className="card-img-top rounded"
                    style={{ maxHeight: "150px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "#ffffff", fontWeight: "bold" }}>
                      {brand.name}
                    </h5>
                    <p className="card-text" style={{ color: "#aaaaaa" }}>
                      Location: {brand.location || "Not Available"}
                    </p>
                    <p style={{ fontWeight: "bold", color: "#ffffff" }}>{brand.offer || "No offers available"}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center" style={{ color: "#aaaaaa" }}>
              Loading brands...
            </p>
          )}
        </div>
      </section>

      {/* Button */}
      <div className="text-center mt-4">
        <button
          className="btn px-5 py-3"
          style={{
            borderRadius: "30px",
            backgroundColor: "#000000",
            border: "2px solid #ffffff",
            fontWeight: "bold",
            color: "#ffffff",
          }}
          onClick={Brandsnearyou}
        >
          Brands Near You
        </button>
      </div>

      {/* About Us */}
      <section
        id="about-section"
        className="mt-5 p-4 text-center"
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          borderRadius: "15px",
        }}
      >
        <h2 className="fw-bold">ABOUT US</h2>
        <p className="mt-3" style={{ color: "#333333" }}>
          <strong>Lore Zone</strong> is your go-to destination for the latest fashion trends, job opportunities, and
          industry insights. Our mission is to connect fashion enthusiasts, professionals, and brands in one vibrant
          community.
        </p>
        <p className="mt-3" style={{ color: "#333333" }}>
          Whether you're looking for the <strong>hottest new styles</strong>, exploring <strong>career paths</strong>,
          or seeking <strong>networking opportunities</strong>, we ensure you stay ahead of the curve. Our platform
          features <strong>exclusive brand offers</strong>, industry news, and expert advice.
        </p>

        <div className="row mt-4">
          <div className="col-md-6">
            <h5 style={{ color: "#000000", fontWeight: "bold" }}>Contact</h5>
            <p>Email: lorezone@gmail.com</p>
            <p>Phone: +91 9502508859</p>
          </div>
          <div className="col-md-6">
            <h5 style={{ color: "#000000", fontWeight: "bold" }}>Follow Us</h5>
            <p>Instagram | Facebook | Twitter/X | LinkedIn</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
