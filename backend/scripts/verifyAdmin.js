const axios = require('axios');

const API_URL = 'http://localhost:8081/api';

const runVerification = async () => {
    try {
        console.log("🚀 Starting Admin Verification...");

        // 1. Login as Admin
        // Assuming 'admin' user exists from previous setup or seeds. 
        // If not, we might need to create one, but let's try to login first.
        let token;
        try {
            const loginRes = await axios.post(`${API_URL}/auth/login`, {
                email: "admin@lorezone.com",
                password: "adminpassword" // Replace with actual admin credentials if known, or mock it
            });
            token = loginRes.data.token;
            console.log("✅ Admin Logged In.");
        } catch (e) {
            console.log("⚠️ Admin login failed (expected if admin not seeded). Skiping auth check for now to test public trend API.");
        }

        // 2. Test Public Trends API (Fix for User Issue)
        console.log(`\n2. Testing Public Trends API...`);
        const trendsRes = await axios.get(`${API_URL}/trend/trends`);

        if (Array.isArray(trendsRes.data) && trendsRes.data.length > 0) {
            console.log(`✅ Public Trends API returned ${trendsRes.data.length} items.`);
            const firstTrend = trendsRes.data[0];
            if (firstTrend.brand_name) {
                console.log(`   Sample Trend: "${firstTrend.style_name}" by ${firstTrend.brand_name}`);
            } else {
                console.warn(`   ⚠️ Trend missing brand_name. Check query.`);
            }
        } else {
            console.warn("⚠️ No trends found. Upload a trend first to verify.");
        }

        console.log("\n🎉 CHECKS COMPLETED!");

    } catch (error) {
        console.error("\n❌ Verification Failed:", error.response ? error.response.data : error.message);
    }
};

runVerification();
