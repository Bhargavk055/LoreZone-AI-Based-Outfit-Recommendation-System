const pool = require('../config/db');

const populateAll = async () => {
    try {
        console.log("🌱 Populating ALL Categories...");

        const newTrends = [
            { type: 'Summer', name: 'Beach Vibes', desc: 'Light and airy styles for the heat.', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
            { type: 'Summer', name: 'Floral Dresses', desc: 'Bright patterns for sunny days.', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },

            { type: 'Winter', name: 'Cozy Knits', desc: 'Warm sweaters for cold nights.', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
            { type: 'Winter', name: 'Puffer Jackets', desc: 'Essential outerwear trends.', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },

            { type: 'Casual', name: 'Airport Look', desc: 'Comfy travel attire.', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
            { type: 'Casual', name: 'Denim on Denim', desc: 'The classic jean jacket look.', img: 'https://images.unsplash.com/photo-1582533791826-c2cf297e60ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },

            { type: 'Formal', name: 'Evening Gowns', desc: 'Elegant wear for special events.', img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },

            { type: 'Streetwear', name: 'Urban Hoodies', desc: 'Oversized and graphic styles.', img: 'https://images.unsplash.com/photo-1512353087810-25dfcd100962?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
        ];

        for (const t of newTrends) {
            // Check if similar exists to avoid dups
            const [rows] = await pool.query("SELECT * FROM trends WHERE style_name = ?", [t.name]);
            if (rows.length === 0) {
                await pool.query(
                    "INSERT INTO trends (trend_type, style_name, description, style_pic_url, brand_name) VALUES (?, ?, ?, ?, ?)",
                    [t.type, t.name, t.desc, t.img, 'LoreZone']
                );
                console.log(`✅ Added: ${t.type} - ${t.name}`);
            } else {
                console.log(`⚠️ Skipped (Exists): ${t.type} - ${t.name}`);
            }
        }

        console.log("🎉 All categories are now populated!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error populating:", error);
        process.exit(1);
    }
};

populateAll();
