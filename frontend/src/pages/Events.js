import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";


const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/event/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div style={{
      backgroundColor: "#000", // Override
      color: "#fff",
      minHeight: "100vh",
      padding: "40px 10%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "all 0.3s ease"
    }}>
      <Navbar />
      <br />
      <br />
      <br />
      <h2 style={{
        textAlign: "center",
        fontWeight: "bold",
        color: "#D4AF37", // Gold in dark, Gold in light
        marginBottom: "30px",
        fontSize: "2.5rem",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
      }}>✨ Upcoming Events ✨</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.event_id || event.id}>
            <div className="card" style={{
              background: "#1a1a1a",
              color: "#fff",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
              border: "1px solid #333"
            }}>
              <div className="card-body">
                <h5 style={{ fontSize: "20px", fontWeight: "bold", color: "#007BFF" }}>{event.organization_name}</h5>
                <p style={{ fontSize: "14px", color: "#aaa" }}>
                  📅 <strong>{event.event_date}</strong> | ⏰ {event.event_time}
                </p>
                <p style={{ fontSize: "16px", fontWeight: "bold", color: "#28A745" }}>📍 <strong>{event.location}</strong></p>
                <p style={{ fontSize: "14px", color: "#aaa" }}>{event.description}</p>
                <h6 style={{ fontSize: "16px", fontWeight: "bold", color: "#DC3545" }}>Price: 💲{event.ticket_price}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
