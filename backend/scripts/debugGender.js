const Link = require('../config/db'); // Assuming pool matches updated wrapper
// Or use direct sqlite3 for raw check
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../lorezone.db');
const db = new sqlite3.Database(dbPath);

db.all("SELECT user_id, gender FROM posts", [], (err, rows) => {
    if (err) console.error(err);
    else console.log("DB Content:", rows);
});
