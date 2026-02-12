const User = require('../models/userModel');

const upgradeSubscription = async (req, res) => {
    try {
        const userId = req.user.id; // From Auth Middleware
        const { plan } = req.body;

        if (!plan) {
            return res.status(400).json({ message: "Plan is required" });
        }

        await User.updateSubscription(userId, plan);

        // Fetch updated user to return new status
        const updatedUser = await User.findById(userId);

        res.json({
            message: `Successfully upgraded to ${plan}`,
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                subscription_plan: updatedUser.subscription_plan,
                is_verified: updatedUser.is_verified
            }
        });
    } catch (error) {
        console.error("Error upgrading subscription:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const togglePrivacy = async (req, res) => {
    try {
        const userId = req.user.id;
        // Fetch current status to toggle
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const newStatus = user.is_private ? 0 : 1;
        await User.updatePrivacy(userId, newStatus);

        res.json({
            message: `Privacy updated to ${newStatus ? "Private" : "Public"}`,
            is_private: newStatus
        });
    } catch (error) {
        console.error("Error toggling privacy:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { upgradeSubscription, togglePrivacy };
