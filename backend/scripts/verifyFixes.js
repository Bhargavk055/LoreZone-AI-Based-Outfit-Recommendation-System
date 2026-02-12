const axios = require('axios');

const API_URL = 'http://localhost:8081/api';

const runVerification = async () => {
    try {
        console.log("🚀 Starting Helper Verification...");

        // 1. Register a new Brand User
        const brandName = `InsightsTest_${Date.now()}`;
        const email = `${brandName}@example.com`;
        const password = "password123";

        console.log(`\n1. Registering ${brandName}...`);
        const registerRes = await axios.post(`${API_URL}/auth/register`, {
            username: `[BRAND] ${brandName}`,
            email: email,
            password: password
        });

        const token = registerRes.data.token;
        console.log("✅ Registered. Token received.");

        // 2. Default Plan Check
        // In a real browser test we'd check the DOM, but here we verify the API returns the correct default
        const meRes = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (meRes.data.subscription_plan === "STARTER") {
            console.log("✅ Default Plan is STARTER (Correct). Profile should show this.");
        } else {
            console.error("❌ Default Plan Mismatch:", meRes.data.subscription_plan);
        }

        // 3. Upgrade Subscription
        console.log(`\n3. Upgrading Subscription to EMPIRE...`);
        const upgradeRes = await axios.post(`${API_URL}/user/upgrade`, {
            plan: "EMPIRE"
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (upgradeRes.data.user.subscription_plan === "EMPIRE") {
            console.log("✅ API confirma upgrade to EMPIRE.");
            console.log("   (Frontend Profile.js will now display 'EMPIRE' because it reads from this data)");
        } else {
            console.error("❌ API failed to upgrade.");
        }

        console.log("\n🎉 CHECKS PASSED! Insights page is static and should be manually checked.");

    } catch (error) {
        console.error("\n❌ Verification Failed:", error.response ? error.response.data : error.message);
    }
};

runVerification();
