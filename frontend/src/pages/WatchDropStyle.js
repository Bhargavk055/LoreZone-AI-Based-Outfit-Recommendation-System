import React, { useState } from "react";
import Navbar from "./Navbar";

function WatchDropStyle() {
  const [filters, setFilters] = useState({
    skin_tone: "",
    height: "",
    gender: "",
    body_type: "",
    occasion: "",
    theme: "",
    price: 0,
  });

  const [topLikedOutfits, setTopLikedOutfits] = useState([]);
  const [error, setError] = useState("");
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchTopLikedOutfits = async () => {
    setError("");
    setTopLikedOutfits([]);

    // Filter out empty values to avoid sending them in query
    const filtered = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );

    const queryString = new URLSearchParams(filtered).toString();
    console.log("Sending query:", queryString); // for debug

    try {
      const response = await fetch(
        `http://localhost:8081/api/posts/top-liked?${queryString}`
      );


      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format. Try again.");
      }

      setTopLikedOutfits(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setTopLikedOutfits([]);
    }
  };

  return (
    <div style={staticStyles.container}>
      <Navbar />
      <div style={staticStyles.wrapper}>
        <h1 style={staticStyles.heading}>Find Your Perfect Style</h1>
        <p style={staticStyles.subheading}>
          Discover outfits tailored to your unique features and preferences.
        </p>

        <div style={staticStyles.filterBox}>
          <h3 style={staticStyles.filterTitle}>Personalize Your Search</h3>
          <div style={staticStyles.filterGrid}>
            <select name="skin_tone" onChange={handleChange} style={staticStyles.select}>
              <option value="">Skin Tone</option>
              <option>Fair</option>
              <option>Medium</option>
              <option>Olive</option>
              <option>Dark</option>
            </select>

            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              onChange={handleChange}
              style={staticStyles.input}
            />

            <select name="gender" onChange={handleChange} style={staticStyles.select}>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <select name="body_type" onChange={handleChange} style={staticStyles.select}>
              <option value="">Body Type</option>
              <option>Hourglass</option>
              <option>Pear</option>
              <option>Athletic</option>
              <option>Apple</option>
              <option>Rectangle</option>
            </select>

            <select name="occasion" onChange={handleChange} style={staticStyles.select}>
              <option value="">Occasion</option>
              <option>Party</option>
              <option>Date</option>
              <option>Wedding</option>
              <option>Work</option>
              <option>Casual</option>
              <option>Street Style</option>
              <option>Formal</option>
              <option>Vacation</option>
            </select>

            <select name="theme" onChange={handleChange} style={staticStyles.select}>
              <option value="">Theme</option>
              <option>Nature</option>
              <option>Retro</option>
              <option>City</option>
              <option>Classic</option>
              <option>Vintage</option>
            </select>
          </div>

          <div style={staticStyles.priceSection}>
            <label style={staticStyles.priceLabel}>
              Price Range (₹0 - ₹100000): <strong>₹{filters.price}</strong>
            </label>
            <input
              type="range"
              min="0"
              max="100000"
              value={filters.price}
              name="price"
              onChange={handleChange}
              style={staticStyles.slider}
            />
            <div style={staticStyles.priceRange}>
              <span>₹0</span>
              <span>₹100000</span>
            </div>
          </div>

          <div style={staticStyles.sortRow}>
            <select name="sort" style={staticStyles.select}>
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <button onClick={fetchTopLikedOutfits} style={staticStyles.button}>
              🔍 Find Outfits
            </button>
          </div>

          {error && <p style={staticStyles.errorText}>{error}</p>}
        </div>

        <div style={staticStyles.outfitsContainer}>
          {topLikedOutfits.length > 0 ? (
            topLikedOutfits.map((outfit, index) => (
              <div key={index} style={staticStyles.outfitCard}>
                <img
                  src={outfit.pic_url}
                  alt="Outfit"
                  style={staticStyles.outfitImage}
                />
                <div style={staticStyles.outfitDetails}>
                  <h3 style={staticStyles.outfitTitle}>
                    {outfit.occasion} - {outfit.theme}
                  </h3>
                  <p>{outfit.gender} • {outfit.body_type}</p>
                  <p>Skin Tone: {outfit.skin_tone}</p>
                  <p>Height: {outfit.height} cm</p>
                  <p style={staticStyles.likes}>❤ {outfit.likes_count}</p>
                  <button style={staticStyles.detailsButton} onClick={() => setSelectedOutfit(outfit)}>
                    View More Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={staticStyles.noResults}>No outfits found.</p>
          )}
        </div>
        {/* --- Static Cards Grid (3 rows, 3 per row) --- */}
        <h2 style={{ textAlign: "left", margin: "40px 0 15px", fontSize: "1.5rem", fontWeight: "600", color: "#D4AF37" }}>9 Outfits Found</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          justifyContent: "center",
        }}>
          {[
            {
              name: "Nature Style",
              gender: "Male",
              body_type: "Athletic",
              skin_tone: "Medium",
              height: 178,
              occasion: "Vacation",
              theme: "Nature",
              price: 79.99,
              likes_count: 210,
              description: "Relaxed vacation outfit perfect for outdoor adventures. Features a linen shirt, cargo shorts and comfortable sandals.",
              color: "Beige",
              brand: "NatureTrek",
              pic_url: "/images/ward1.webp",
            },
            {
              name: "Retro Style",
              gender: "Male",
              body_type: "Rectangle",
              skin_tone: "Dark",
              height: 180,
              occasion: "Party",
              theme: "Retro",
              price: 119.99,
              likes_count: 156,
              description: "Bold retro-style outfit perfect for high-energy party nights. Vintage patterns and sharp silhouettes.",
              color: "Black/Red",
              brand: "RetroVibe",
              pic_url: "/images/ward2.webp",
            },
            {
              name: "Vintage Style",
              gender: "Female",
              body_type: "Apple",
              skin_tone: "Fair",
              height: 168,
              occasion: "Street Style",
              theme: "Vintage",
              price: 129.99,
              likes_count: 145,
              description: "Street-smart vintage fashion with a modern twist. Ideal for casual hangouts and city walks.",
              color: "Pastel Blue",
              brand: "UrbanChic",
              pic_url: "/images/ward3.jpg",
            },
            {
              name: "Boho Chic",
              gender: "Female",
              body_type: "Hourglass",
              skin_tone: "Olive",
              height: 165,
              occasion: "Date",
              theme: "Classic",
              price: 89.99,
              likes_count: 178,
              description: "Bohemian elegance for your date night. Maxi dress with earthy tones and flowing patterns.",
              color: "Maroon",
              brand: "BohoSoul",
              pic_url: "/images/ward4.jpg",
            },
            {
              name: "Work Formal",
              gender: "Male",
              body_type: "Rectangle",
              skin_tone: "Fair",
              height: 182,
              occasion: "Work",
              theme: "Classic",
              price: 149.99,
              likes_count: 192,
              description: "Sleek formal wear for office presence. Navy suit, light blue shirt and formal shoes.",
              color: "Navy Blue",
              brand: "FormLine",
              pic_url: "/images/ward5.webp",
            },
            {
              name: "Wedding Glam",
              gender: "Female",
              body_type: "Pear",
              skin_tone: "Medium",
              height: 160,
              occasion: "Wedding",
              theme: "Vintage",
              price: 199.99,
              likes_count: 203,
              description: "Luxurious ethnic wear for weddings. Embroidered lehenga with golden accents.",
              color: "Gold/Red",
              brand: "GlamCouture",
              pic_url: "/images/ward6.jpeg",
            },
            {
              name: "Street Edge",
              gender: "Male",
              body_type: "Athletic",
              skin_tone: "Dark",
              height: 175,
              occasion: "Street Style",
              theme: "City",
              price: 99.99,
              likes_count: 140,
              description: "Urban edge wear – leather jacket, ripped jeans and a bold t-shirt.",
              color: "Black",
              brand: "UrbanMode",
              pic_url: "/images/ward9.avif",
            },
            {
              name: "Casual Day Out",
              gender: "Female",
              body_type: "Hourglass",
              skin_tone: "Fair",
              height: 162,
              occasion: "Casual",
              theme: "Nature",
              price: 69.99,
              likes_count: 125,
              description: "Comfy and cute. Floral top with denim shorts and sneakers.",
              color: "Peach",
              brand: "EasyWear",
              pic_url: "/images/ward8.jpg",
            },
            {
              name: "Business Casual",
              gender: "Male",
              body_type: "Apple",
              skin_tone: "Olive",
              height: 176,
              occasion: "Work",
              theme: "City",
              price: 110.99,
              likes_count: 167,
              description: "Balance style and professionalism. Blazer with chinos and loafers.",
              color: "Grey",
              brand: "MetroGent",
              pic_url: "/images/ward1.webp",
            },
          ].map((outfit, index) => (
            <div key={`card-${index}`} style={{
              width: "100%",
              backgroundColor: "#1a1a1a",
              color: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #333"
            }}>
              <img
                src={outfit.pic_url}
                alt="Outfit"
                style={{ width: "100%", borderRadius: "10px", marginBottom: "10px", height: "400px", objectFit: "cover" }}
              />
              <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "5px", color: "#D4AF37" }}>{outfit.occasion} Style</h3>
              <p style={{ margin: "0", fontWeight: "500", color: "#aaa" }}>{outfit.name}</p>
              <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#888" }}>{outfit.gender} • {outfit.body_type}</p>
              <p style={{ fontSize: "0.85rem", color: "#777" }}>Skin Tone: {outfit.skin_tone}</p>
              <p style={{ fontSize: "0.85rem", color: "#777" }}>Height: {outfit.height} cm</p>
              <p style={{ fontWeight: "bold", color: "#e11d48", margin: "10px 0" }}>❤ {outfit.likes_count}</p>
              <button
                style={{
                  backgroundColor: "#D4AF37",
                  color: "#000",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={() => setSelectedOutfit(outfit)}
              >
                Details
              </button>
            </div>
          ))}
        </div>


        {selectedOutfit && (
          <div style={staticStyles.modalOverlay} onClick={() => setSelectedOutfit(null)}>
            <div style={staticStyles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h2>{selectedOutfit.occasion} {selectedOutfit.theme} Outfit</h2>
              <p style={staticStyles.subheading}>Complete outfit details and specifications</p>
              <div style={staticStyles.modalMain}>
                <img src={selectedOutfit.pic_url} alt="Outfit" style={staticStyles.modalImage} />
                <div>
                  <h3 style={staticStyles.modalTitle}>{selectedOutfit.name || "Style Info"}</h3>
                  <p><strong>₹{selectedOutfit.price}</strong></p>
                  <p>{selectedOutfit.description || "No description available."}</p>
                  <ul style={staticStyles.modalList}>
                    <li>👤 Gender: {selectedOutfit.gender}, Body Type: {selectedOutfit.body_type}</li>
                    <li>📏 Height: {selectedOutfit.height} cm</li>
                    <li>🎯 Occasion: {selectedOutfit.occasion}, Theme: {selectedOutfit.theme}</li>
                    <li>🎨 Color: {selectedOutfit.color || "N/A"}, Brand: {selectedOutfit.brand || "N/A"}</li>
                  </ul>
                </div>
              </div>
              <button onClick={() => setSelectedOutfit(null)} style={staticStyles.modalClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const staticStyles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    padding: "0",
    margin: "0",
  },
  wrapper: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "2rem",
    textAlign: "center",
    paddingTop: "100px",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#D4AF37",
    marginBottom: "10px",
  },
  subheading: {
    fontSize: "1rem",
    color: "#aaa",
    marginBottom: "30px",
  },
  filterBox: {
    background: "#1a1a1a",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: "2rem",
    border: "1px solid #333"
  },
  filterTitle: {
    textAlign: "left",
    marginBottom: "1rem",
    fontSize: "1.2rem",
    color: "#D4AF37",
  },
  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  select: {
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #555",
    borderRadius: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #555",
    borderRadius: "5px",
  },
  button: {
    padding: "12px 25px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    backgroundColor: "#D4AF37",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  errorText: {
    color: "red",
    fontSize: "1.1rem",
    marginTop: "10px",
  },
  outfitsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
  },
  outfitCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    border: "1px solid #333",
    transition: "0.3s",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    color: "#fff"
  },
  outfitImage: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  outfitDetails: {
    fontSize: "1rem",
    color: "#aaa",
  },
  outfitTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#D4AF37",
  },
  likes: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#e11d48",
  },
  noResults: {
    fontSize: "1.2rem",
    color: "#888",
  },
  detailsButton: {
    backgroundColor: "#D4AF37",
    color: "#000",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: 'bold'
  },
  priceSection: {
    marginTop: "20px",
    textAlign: "left",
  },
  priceLabel: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#fff",
  },
  slider: {
    width: "100%",
    appearance: "none",
    height: "6px",
    background: "#555",
    borderRadius: "5px",
    outline: "none",
    marginBottom: "5px",
  },
  priceRange: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9rem",
    color: "#aaa",
  },
  sortRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    gap: "10px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    padding: "2rem",
    borderRadius: "10px",
    maxWidth: "800px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    color: "#fff",
    border: "1px solid #333"
  },
  modalMain: {
    display: "flex",
    gap: "1.5rem",
    marginTop: "1rem",
  },
  modalImage: {
    width: "300px",
    borderRadius: "8px",
  },
  modalTitle: {
    margin: "0 0 0.5rem",
    color: "#D4AF37"
  },
  modalList: {
    listStyleType: "none",
    padding: 0,
    lineHeight: "1.6rem",
  },
  modalClose: {
    marginTop: "1rem",
    padding: "10px 20px",
    backgroundColor: "#D4AF37",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  },
};

export default WatchDropStyle;