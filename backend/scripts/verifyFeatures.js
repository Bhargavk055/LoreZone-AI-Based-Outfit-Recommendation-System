const axios = require('axios');

const API_URL = 'http://localhost:8081/api';

const runVerification = async () => {
    try {
        console.log("🚀 Starting Verification...");

        // 1. Register a new Brand User
        const brandName = `TestBrand_${Date.now()}`;
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

        // 2. Upgrade Subscription
        console.log(`\n2. Upgrading Subscription to PROFESSIONAL...`);
        const upgradeRes = await axios.post(`${API_URL}/user/upgrade`, {
            plan: "PROFESSIONAL"
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (upgradeRes.data.user.subscription_plan === "PROFESSIONAL" && upgradeRes.data.user.is_verified === 1) {
            console.log("✅ Subscription Upgraded.");
        } else {
            console.error("❌ Subscription Upgrade Failed:", upgradeRes.data);
            process.exit(1);
        }

        // 3. Upload a Trend
        console.log(`\n3. Uploading a Trend...`);
        const trendData = {
            trend_type: "Summer",
            style_name: "Verification Dress",
            description: "Automated test trend",
            style_pic_url: "http://example.com/dress.jpg"
        };

        const uploadRes = await axios.post(`${API_URL}/trend/trends`, trendData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (uploadRes.status === 201) {
            console.log("✅ Trend Uploaded.");
        } else {
            console.error("❌ Trend Upload Failed");
            process.exit(1);
        }

        // 4. Verify Trend appears in Feed
        console.log(`\n4. Verifying Trend in Public Feed...`);
        const feedRes = await axios.get(`${API_URL}/trend/trends`);
        const myTrend = feedRes.data.find(t => t.style_name === "Verification Dress" && t.brand_name === `[BRAND] ${brandName}`);

        if (myTrend) {
            console.log("✅ Trend found in feed!");
        } else {
            console.error("❌ Trend NOT found in feed.");
            process.exit(1);
        }

        console.log("\n🎉 ALL CHECKS PASSED!");

    } catch (error) {
        console.error("\n❌ Verification Failed:", error.response ? error.response.data : error.message);
    }
};

runVerification();
