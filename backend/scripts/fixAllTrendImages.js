const pool = require('../config/db');

const fixAllImages = async () => {
    try {
        console.log("🎨 Fixing ALL Trend Images...");

        const updates = [
            { id: 1, url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }, // Clothing Trends (Y2K)
            { id: 2, url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }, // Blazers
            { id: 3, url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }, // Sustainable
            { id: 4, url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }, // Techwear
            { id: 5, url: "https://images.unsplash.com/photo-1529139574466-a302d20525a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }, // Digital Fashion
            { id: 6, url: "https://images.unsplash.com/photo-1550614000-4b9519e07d72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }  // Zero Waste
        ];

        for (const update of updates) {
            // Check if trend exists first to avoid errors if IDs don't match exactly
            const [rows] = await pool.query("SELECT id FROM trends WHERE id = ?", [update.id]);
            if (rows.length > 0) {
                await pool.query("UPDATE trends SET style_pic_url = ? WHERE id = ?", [update.url, update.id]);
                console.log(`✅ Updated Trend ${update.id}`);
            } else {
                console.log(`⚠️ Trend ${update.id} not found, skipping.`);
            }
        }

        // Also update any other trends that might have missing images or local paths
        await pool.query("UPDATE trends SET style_pic_url = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' WHERE style_pic_url LIKE '/images/%' OR style_pic_url IS NULL OR style_pic_url = ''");
        console.log("✅ Updated any remaining broken local paths.");

        console.log("🎉 All images fixed! Every category should now have visuals.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error fixing images:", error);
        process.exit(1);
    }
};

fixAllImages();
