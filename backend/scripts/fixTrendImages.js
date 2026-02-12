const pool = require('../config/db');

const fixImages = async () => {
    try {
        console.log("🎨 Fixing Trend Images...");

        const updates = [
            { id: 2, url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }, // Blazer
            { id: 3, url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }, // Fashion
            { id: 4, url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }, // Model
            { id: 5, url: "https://images.unsplash.com/photo-1529139574466-a302d20525a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }, // Digital
            { id: 6, url: "https://images.unsplash.com/photo-1550614000-4b9519e07d72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }  // Raw
        ];

        for (const update of updates) {
            await pool.query("UPDATE trends SET style_pic_url = ? WHERE id = ?", [update.url, update.id]);
            console.log(`✅ Updated Trend ${update.id}`);
        }

        console.log("🎉 All images fixed! Trends page should now look beautiful.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error fixing images:", error);
        process.exit(1);
    }
};

fixImages();
