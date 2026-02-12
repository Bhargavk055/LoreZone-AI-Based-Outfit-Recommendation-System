const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../lorezone.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("Upgrading Database for Creator Features...");

    // 1. Add is_private to users
    db.run("ALTER TABLE users ADD COLUMN is_private INTEGER DEFAULT 0", (err) => {
        if (err && err.message.includes("duplicate column")) {
            console.log("✓ users.is_private already exists");
        } else if (err) {
            console.error("Error adding is_private:", err.message);
        } else {
            console.log("✓ Added users.is_private");
        }
    });

    // 2. Add media_type to posts
    db.run("ALTER TABLE posts ADD COLUMN media_type TEXT DEFAULT 'image'", (err) => {
        if (err && err.message.includes("duplicate column")) {
            console.log("✓ posts.media_type already exists");
        } else if (err) {
            console.error("Error adding media_type:", err.message);
        } else {
            console.log("✓ Added posts.media_type");
        }
    });
});

db.close(() => {
    console.log("Database Upgrade Complete.");
});
