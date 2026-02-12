const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../lorezone.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("Checking 'users' table schema:");
    db.all("PRAGMA table_info(users)", (err, rows) => {
        if (err) {
            console.error("Error getting schema:", err);
        } else {
            console.table(rows);
        }
    });

    console.log("\nChecking registered users:");
    db.all("SELECT id, username, email, is_private, isAdmin FROM users", (err, rows) => {
        if (err) {
            console.error("Error getting users:", err);
        } else {
            console.table(rows);
        }
    });
});

db.close();
