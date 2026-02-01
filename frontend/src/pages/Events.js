import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://lorezone.onrender.com/api/event/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />
      <br/>
      <br/>
      <br/>
      <h2 style={styles.title}>✨ Upcoming Events ✨</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.event_id || event.id}>
            <div className="card" style={styles.card}>
              <div className="card-body">
                <h5 style={styles.cardTitle}>{event.organization_name}</h5>
                <p style={styles.eventDetails}>
                  📅 <strong>{event.event_date}</strong> | ⏰ {event.event_time}
                </p>
                <p style={styles.location}>📍 <strong>{event.location}</strong></p>
                <p style={styles.description}>{event.description}</p>
                <h6 style={styles.price}>Price: 💲{event.ticket_price}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#F8F9FA",
    minHeight: "100vh",
    padding: "40px 10%",
    color: "#343A40",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#212529",
    marginBottom: "30px",
    fontSize: "2.5rem",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
  },
  card: {
    background: "#FFFFFF",
    color: "#212529",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#007BFF",
  },
  eventDetails: {
    fontSize: "14px",
    color: "#6C757D",
  },
  location: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#28A745",
  },
  description: {
    fontSize: "14px",
    color: "#495057",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#DC3545",
  },
};

export default Events;
