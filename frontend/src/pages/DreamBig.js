import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Spinner } from "react-bootstrap";


const DreamBig = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/api/dream/dream_big")
      .then((response) => response.json())
      .then((data) => {
        setDreams(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      background: "#000",
      color: "#fff",
      minHeight: "100vh",
      padding: "80px 10% 40px 10%", // Adjusted padding for Navbar
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "all 0.3s ease"
    }}>
      <Navbar />

      <h1 style={{
        textAlign: "center",
        fontWeight: "bold",
        color: "#D4AF37",
        marginBottom: "30px",
        fontSize: "2.5rem",
        textTransform: "uppercase",
        letterSpacing: "1.5px"
      }}>🚀 Dream Big Opportunities</h1>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 w-100">
          {dreams.map((dream) => (
            <div key={dream.dream_id} className="col d-flex align-items-stretch">
              <Card style={{
                background: "#1a1a1a",
                color: "#fff",
                minHeight: "380px",
                maxHeight: "380px",
                padding: "25px",
                borderRadius: "15px",
                border: "1px solid #333",
                width: "100%",
                transition: "transform 0.3s ease-in-out"
              }} className="shadow-lg">
                <Card.Body>
                  <Card.Title style={{ fontSize: "22px", fontWeight: "bold", color: "#007bff" }}>
                    {dream.organization_name}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "16px", fontStyle: "italic", color: "#aaa" }}>{dream.location}</Card.Text>
                  <ul style={{ paddingLeft: "20px", fontSize: "15px", lineHeight: "1.8", color: "#fff" }}>
                    <li><strong>💰 Compensation:</strong> ${parseFloat(dream.compensation).toLocaleString()}</li>
                    <li><strong>📅 Experience:</strong> {dream.experience}</li>
                    <li><strong>📏 Height:</strong> {dream.height}</li>
                    <li><strong>👫 Gender:</strong> {dream.gender}</li>
                    <li><strong>🏋️ Body Type:</strong> {dream.body_type}</li>
                    <li><strong>📞 Contact:</strong> {dream.phone_number}</li>
                  </ul>
                  <div style={{ marginTop: "12px" }}>
                    {dream.required_skills.split(",").map((skill, index) => (
                      <span key={index} style={{
                        display: "inline-block",
                        background: "#007bff",
                        color: "#ffffff",
                        padding: "6px 12px",
                        borderRadius: "25px",
                        fontSize: "14px",
                        marginRight: "6px",
                        marginBottom: "6px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DreamBig;
