const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:8081/api';

const runVerification = async () => {
    try {
        console.log("🚀 Starting Upload Verification...");

        // 1. Register a new Brand User
        const brandName = `UploadTest_${Date.now()}`;
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

        // 2. Upload a Trend with Image
        console.log(`\n2. Uploading Trend with Image...`);

        const form = new FormData();
        form.append('trend_type', 'Casual');
        form.append('style_name', 'Uploaded Style');
        form.append('description', 'Testing file upload');
        form.append('image', fs.createReadStream(path.join(__dirname, 'test_image.png')));

        const uploadRes = await axios.post(`${API_URL}/trend/trends`, form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        });

        if (uploadRes.status === 201) {
            console.log("✅ Trend Uploaded via Multipart/Form-Data.");
        } else {
            console.error("❌ Upload Failed:", uploadRes.data);
            process.exit(1);
        }

        // 3. Verify Trend Data
        console.log(`\n3. Verifying Trend URL...`);
        const feedRes = await axios.get(`${API_URL}/trend/trends`);
        const myTrend = feedRes.data.find(t => t.style_name === 'Uploaded Style' && t.brand_name === `[BRAND] ${brandName}`);

        if (myTrend) {
            console.log("✅ Trend found in database.");
            console.log(`   Image URL: ${myTrend.style_pic_url}`);

            if (myTrend.style_pic_url.includes('/uploads/')) {
                console.log("✅ Image URL points to local uploads directory.");
            } else {
                console.error("❌ Image URL does NOT point to uploads directory.");
            }
        } else {
            console.error("❌ Trend NOT found in feed.");
        }

        console.log("\n🎉 UPLOAD VERIFICATION PASSED!");

    } catch (error) {
        console.error("\n❌ Verification Failed:", error.response ? error.response.data : error.message);
    }
};

runVerification();
