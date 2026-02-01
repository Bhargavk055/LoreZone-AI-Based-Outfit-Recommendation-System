const Event = require('../models/brandModel');

const getEvents = async (req, res) => { 
    try {
        const events = await Event.getAllEvents(); 
        res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ error: "Database error" });
    }
};

module.exports = { getEvents };
