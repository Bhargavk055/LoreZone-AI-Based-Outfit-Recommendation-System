import { useState } from "react";

const brandData = [
  { id: 1, name: "Nike", location: "USA", logo_url: "https://via.placeholder.com/150", offer: "50% Off" },
  { id: 2, name: "Adidas", location: "Germany", logo_url: "https://via.placeholder.com/150", offer: "Buy 1 Get 1" },
  { id: 3, name: "Puma", location: "Germany", logo_url: "https://via.placeholder.com/150", offer: "20% Off" },
  { id: 4, name: "Reebok", location: "USA", logo_url: "https://via.placeholder.com/150", offer: "30% Off" },
  { id: 5, name: "Under Armour", location: "USA", logo_url: "https://via.placeholder.com/150", offer: "15% Off" },
  { id: 6, name: "New Balance", location: "USA", logo_url: "https://via.placeholder.com/150", offer: "Special Discounts" },
  { id: 7, name: "ASICS", location: "Japan", logo_url: "https://via.placeholder.com/150", offer: "Free Shipping" },
  { id: 8, name: "Fila", location: "Italy", logo_url: "https://via.placeholder.com/150", offer: "Up to 40% Off" },
  { id: 9, name: "Skechers", location: "USA", logo_url: "https://via.placeholder.com/150", offer: "Limited Time Deal" },
  { id: 10, name: "Converse", location: "USA", logo_url: "https://via.placeholder.com/150", offer: "Exclusive Drops" },
];

function ShowMoreBrands() {
  const [showBrands, setShowBrands] = useState(false);

  return (
    <section
      className="mt-5"
      style={{
        backgroundColor: "#1a1a1a",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        border: "1px solid #333"
      }}
    >
      <h2 className="text-center fw-bold" style={{ color: "#D4AF37", fontSize: "2rem" }}>More Brands</h2>
      <p className="text-center" style={{ color: "#aaa", fontSize: "1.1rem" }}>Explore top fashion brands</p>

      <div className="row mt-4">
        {showBrands &&
          brandData.map((brand) => (
            <div className="col-md-4 text-center" key={brand.id}>
              <div
                className="card shadow-sm p-3 border-0"
                style={{
                  borderRadius: "15px",
                  background: "linear-gradient(to right, #333, #444)",
                  border: "1px solid #333",
                  transition: "0.3s",
                }}
              >
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  className="card-img-top rounded"
                  style={{ maxHeight: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#D4AF37", fontWeight: "bold" }}>{brand.name}</h5>
                  <p className="card-text" style={{ color: "#fff" }}>Location: {brand.location}</p>
                  <p style={{ fontWeight: "bold", color: "#aaa" }}>{brand.offer}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="text-center mt-3">
        <button
          className="btn px-4 py-2"
          style={{
            borderRadius: "30px",
            background: "#D4AF37",
            border: "none",
            fontWeight: "bold",
            color: "#000",
            fontSize: "1rem",
            transition: "0.3s",
          }}
          onClick={() => setShowBrands(!showBrands)}
        >
          {showBrands ? "Show Less" : "Show More Brands"}
        </button>
      </div>
    </section>
  );
}

export default ShowMoreBrands;
