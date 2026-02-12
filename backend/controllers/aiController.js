const Post = require('../models/postModel'); // Reusing Post model to get outfits
const { getRecommendations } = require('../services/recommendationService');
const { getChatResponse } = require('../services/chatService');

const getSmartRecommendations = async (req, res) => {
    try {
        const userPreferences = req.body; // Expects { skin_tone, body_type, etc. }

        // 1. Fetch ALL posts/outfits from DB
        // (In a real app, we might limit this, but for now we fetch all to rank them)
        // We can reuse getTopLikedPosts with empty filters to get everything, or write a new model method.
        // For simplicity, let's assume getTopLikedPosts returns list if filters are null.
        const allOutfits = await Post.getTopLikedPosts({});

        // 2. Run the AI Engine
        const recommendations = getRecommendations(userPreferences, allOutfits);

        res.json(recommendations);
    } catch (error) {
        console.error("AI Recommendation Error:", error);
        res.status(500).json({ error: "Failed to generate recommendations" });
    }
};

const getStylistChat = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const reply = await getChatResponse(message);
        res.json(reply);
    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({ error: "Stylist is offline" });
    }
};

module.exports = { getSmartRecommendations, getStylistChat };
