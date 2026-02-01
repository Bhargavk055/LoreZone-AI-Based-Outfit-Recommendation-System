import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Spinner } from "react-bootstrap";

const DreamBig = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://lorezone.onrender.com/api/dream/dream_big") //https://lorezone.onrender.com/api/dream/dream_big"
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
    <div style={styles.container}>
      <Navbar />
      <br/>
      <br/>
      <h1 style={styles.title}>🚀 Dream Big Opportunities</h1>
     
      {loading ? (
        <div style={styles.loader}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {dreams.map((dream) => (
            <div key={dream.dream_id} className="col d-flex align-items-stretch">
              <Card style={styles.card} className="shadow-lg w-100">
                <Card.Body>
                  <Card.Title style={styles.jobTitle}>
                    {dream.organization_name}
                  </Card.Title>
                  <Card.Text style={styles.location}>{dream.location}</Card.Text>
                  <ul style={styles.listStyle}>
                    <li><strong>💰 Compensation:</strong> ${parseFloat(dream.compensation).toLocaleString()}</li>
                    <li><strong>📅 Experience:</strong> {dream.experience}</li>
                    <li><strong>📏 Height:</strong> {dream.height}</li>
                    <li><strong>👫 Gender:</strong> {dream.gender}</li>
                    <li><strong>🏋️ Body Type:</strong> {dream.body_type}</li>
                    <li><strong>📞 Contact:</strong> {dream.phone_number}</li>
                  </ul>
                  <div style={styles.skillsContainer}>
                    {dream.required_skills.split(",").map((skill, index) => (
                      <span key={index} style={styles.skillTag}>
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

const styles = {
  container: {
    background: "#f8f9fa",
    minHeight: "100vh",
    padding: "40px 10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: "30px",
    fontSize: "2.5rem",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
  card: {
    minHeight: "380px",
    maxHeight: "380px",
    padding: "25px",
    borderRadius: "15px",
    background: "#ffffff",
    color: "#343a40",
    transition: "transform 0.3s ease-in-out",
  },
  jobTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#007bff",
  },
  location: {
    fontSize: "16px",
    fontStyle: "italic",
    color: "#6c757d",
  },
  listStyle: {
    paddingLeft: "20px",
    fontSize: "15px",
    color: "#343a40",
    lineHeight: "1.8",
  },
  skillsContainer: {
    marginTop: "12px",
  },
  skillTag: {
    display: "inline-block",
    background: "#007bff",
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "25px",
    fontSize: "14px",
    marginRight: "6px",
    cursor: "pointer",
    transition: "0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default DreamBig;
