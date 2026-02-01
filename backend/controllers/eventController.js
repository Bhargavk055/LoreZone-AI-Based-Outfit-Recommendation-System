const Event = require('../models/eventModel');

const getEvents = async (req, res) => { // Make it async
    try {
        const events = await Event.getAllEvents(); // Add await
        res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ error: "Database error" });
    }
};

module.exports = { getEvents };
