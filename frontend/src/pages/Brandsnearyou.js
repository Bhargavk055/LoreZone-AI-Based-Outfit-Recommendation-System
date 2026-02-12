import React from "react";
import Navbar from "./Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Brandsnearyou.css"; // We'll create this

const brands = [
  {
    name: "ZARA",
    pic_url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
    location: "HRX Mall/HYD",
    website: "https://www.zara.com/",
  },
  {
    name: "H&M",
    // Reverting to Unsplash image as it was likely preferred or working reliably
    pic_url: "https://images.unsplash.com/photo-1578983662508-41895226ebfb?q=80&w=2711&auto=format&fit=crop",
    location: "Surgango Mall/HYD",
    website: "https://www2.hm.com/",
  },
  {
    name: "Cadillac",
    // Reverting to Unsplash image
    pic_url: "https://images.unsplash.com/photo-1627064719444-1985feb93f54?q=80&w=2615&auto=format&fit=crop",
    location: "DRX Mall/HYD",
    website: "#",
  },
  {
    name: "BURBERRY",
    pic_url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Burberry_Logo.svg",
    location: "HRX Mall/HYD",
    website: "https://www.burberry.com/",
  },
  {
    name: "UNITED COLORS OF BENETTON",
    pic_url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/United_Colors_of_Benetton_logo.svg",
    location: "Surgango Mall/HYD",
    website: "https://world.benetton.com/",
  },
  {
    name: "FLYING MACHINE",
    // Using a more reliable image if the previous PNG failed
    pic_url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Flying_Machine_%28brand%29_logo.png",
    location: "DRX Mall/HYD",
    website: "https://www.flyingmachine.in/",
  },
  {
    name: "ADIDAS",
    // Reverting to Unsplash image
    pic_url: "https://images.unsplash.com/photo-1658087252613-a4d09bf7a64c?q=80&w=2670&auto=format&fit=crop",
    location: "HRX Mall/HYD",
    website: "https://www.adidas.co.in/",
  },
  {
    name: "BIBA",
    pic_url: "https://upload.wikimedia.org/wikipedia/commons/7/74/Biba_Apparels_Logo.jpg",
    location: "Surgango Mall/HYD",
    website: "https://www.biba.in/",
  },
  {
    name: "ALLEN SOLLY",
    pic_url: "https://upload.wikimedia.org/wikipedia/en/8/87/Allen_Solly_Logo.svg",
    location: "DRX Mall/HYD",
    website: "https://www.allensolly.com/",
  },
];

const Brandsnearyou = () => {

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", paddingBottom: "50px", transition: "all 0.3s ease" }}>
      <Navbar />
      <div style={{ paddingTop: "100px" }}> {/* Padding for Fixed Navbar */}
        <Container>
          <Row className="align-items-center mb-4">
            <Col xs={6} className="text-start">
              <button className="location-btn" style={{ background: "#1a1a1a", color: "#fff", border: "1px solid #333", padding: "10px 20px", borderRadius: "5px" }}>
                📍 Press to select the location
              </button>
            </Col>
            <Col xs={6} className="text-end">
              <h2 className="fw-bold" style={{ color: "#D4AF37" }}>Clothing Brands Near You</h2>
            </Col>
          </Row>

          <Row className="gy-4">
            {brands.map((brand, idx) => (
              <Col key={idx} xs={12} sm={6} md={4}>
                <Card className="brand-card text-center" style={{ background: "#1a1a1a", border: "1px solid #333", color: "#fff" }}>
                  <div style={{ width: "100%", height: "200px", padding: "10px", background: "#fff", display: "flex", justifyContent: "center", alignItems: "center", borderTopLeftRadius: "calc(0.375rem - 1px)", borderTopRightRadius: "calc(0.375rem - 1px)" }}>
                    <Card.Img
                      variant="top"
                      src={brand.pic_url}
                      className="brand-image"
                      style={{ maxHeight: "180px", maxWidth: "100%", objectFit: "contain" }}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x200?text=" + encodeURIComponent(brand.name) }}
                    />
                  </div>
                  <Card.Body>
                    <div className="discount-pill" style={{ display: "inline-block", background: "#e11d48", color: "#fff", padding: "2px 8px", borderRadius: "10px", fontSize: "0.8rem", marginBottom: "5px" }}>30% OFF</div>
                    <div className="location-pill" style={{ color: "#aaa", fontSize: "0.9rem", marginBottom: "10px" }}>{brand.location}</div>
                    <Button variant="dark" href={brand.website} size="sm" className="mt-2"
                      style={{
                        background: "#D4AF37",
                        color: "#000",
                        border: "none",
                        fontWeight: "bold",
                        width: "100%"
                      }}>
                      Visit web
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Brandsnearyou;