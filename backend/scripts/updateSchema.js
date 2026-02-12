const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../lorezone.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("Applying schema updates...");

    // 1. Add subscription_plan to users
    db.run("ALTER TABLE users ADD COLUMN subscription_plan TEXT DEFAULT 'STARTER'", (err) => {
        if (err && !err.message.includes("duplicate column")) console.error("Error adding subscription_plan:", err.message);
        else console.log("✅ Added subscription_plan to users");
    });

    // 2. Add is_verified to users
    db.run("ALTER TABLE users ADD COLUMN is_verified INTEGER DEFAULT 0", (err) => {
        if (err && !err.message.includes("duplicate column")) console.error("Error adding is_verified:", err.message);
        else console.log("✅ Added is_verified to users");
    });

    // 3. Add user_id to trends
    db.run("ALTER TABLE trends ADD COLUMN user_id INTEGER", (err) => {
        if (err && !err.message.includes("duplicate column")) console.error("Error adding user_id:", err.message);
        else console.log("✅ Added user_id to trends");
    });

    // 4. Add brand_name to trends
    db.run("ALTER TABLE trends ADD COLUMN brand_name TEXT", (err) => {
        if (err && !err.message.includes("duplicate column")) console.error("Error adding brand_name:", err.message);
        else console.log("✅ Added brand_name to trends");
    });
});

db.close(() => console.log("Schema update complete."));
