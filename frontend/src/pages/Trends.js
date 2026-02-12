import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Badge } from "react-bootstrap";
import Navbar from "./Navbar";

const Trends = () => {
  const [trends, setTrends] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/trend/trends");
      const data = await response.json();
      setTrends(data);
    } catch (error) {
      console.error("Error fetching trends:", error);
    }
  };

  const filteredTrends = trends.filter(t =>
    (filter === "All" || t.trend_type === filter) &&
    (t.style_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ backgroundColor: "#000", minHeight: '100vh', padding: '0', fontFamily: "'Outfit', sans-serif" }}>
      <Navbar />
      <div style={{ paddingTop: "100px", paddingBottom: "50px" }}>
        <Container fluid className="p-4">

          <div className="text-center mb-5">
            <h1 style={{ fontSize: '3rem', fontWeight: '800', color: "#fff", letterSpacing: "-1px", marginBottom: "20px" }}>
              Trending <span style={{ color: "#D4AF37" }}>Styles</span>
            </h1>

            {/* Scrollable Filter Bar */}
            <div style={{
              display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "30px"
            }}>
              {['All', 'Clothing Trends', 'Industry News', 'Summer', 'Winter', 'Casual', 'Formal', 'Streetwear'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  style={{
                    background: filter === type ? "#D4AF37" : "transparent",
                    color: filter === type ? "#000" : "#aaa",
                    border: filter === type ? "none" : "1px solid #333",
                    padding: "8px 20px", borderRadius: "20px", cursor: "pointer",
                    fontWeight: filter === type ? "bold" : "normal",
                    transition: "all 0.3s ease", fontSize: "0.9rem"
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            <Form.Control
              type="text"
              placeholder="Search trends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                maxWidth: '400px', margin: '0 auto', borderRadius: '30px',
                background: "#1a1a1a", border: "1px solid #333", color: "#fff",
                padding: "10px 20px", textAlign: "center"
              }}
            />
          </div>

          {filteredTrends.length === 0 ? (
            <p className="text-center text-muted" style={{ fontSize: "1.2rem", marginTop: "50px" }}>No trends found matching your criteria.</p>
          ) : (
            <Row className="g-4">
              {filteredTrends.filter(t => t.style_name !== 'Uploaded Style').map(trend => (
                <Col key={trend.id} xl={3} lg={4} md={6} sm={12}>
                  <div style={{
                    background: "#1a1a1a",
                    borderRadius: "15px",
                    overflow: "hidden",
                    border: "1px solid #333",
                    height: "100%",
                    transition: "transform 0.3s ease",
                  }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >

                    {/* Image Container with strict 3:4 Aspect Ratio */}
                    <div style={{ position: "relative", width: "100%", paddingTop: "133%" /* 3:4 Ratio */ }}>
                      <img
                        src={trend.style_pic_url}
                        alt={trend.style_name}
                        style={{
                          position: "absolute", top: "0", left: "0", width: "100%", height: "100%",
                          objectFit: "cover"
                        }}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x600?text=No+Image" }}
                      />
                      <Badge bg={trend.trend_type === 'Clothing Trends' ? 'warning' : 'info'} text="dark"
                        style={{ position: "absolute", top: "15px", left: "15px", zIndex: 1 }}>
                        {trend.trend_type}
                      </Badge>
                    </div>

                    <div style={{ padding: "20px" }}>
                      <h4 style={{ color: "#fff", fontWeight: "700", fontSize: "1.2rem", marginBottom: "5px" }}>{trend.style_name}</h4>
                      <p style={{
                        color: "#888", fontSize: "0.9rem", marginBottom: "15px",
                        display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden",
                        minHeight: "40px" // Ensure text alignment
                      }}>
                        {trend.description}
                      </p>

                      <div className="d-flex justify-content-between align-items-center" style={{ borderTop: "1px solid #333", paddingTop: "15px" }}>
                        <small style={{ color: "#D4AF37", fontWeight: "bold" }}>{trend.brand_name || "LoreZone"}</small>
                        <Button size="sm" variant="outline-light" style={{ borderRadius: "20px", fontSize: "0.8rem", padding: "5px 15px" }}>View</Button>
                      </div>
                    </div>

                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Trends;
