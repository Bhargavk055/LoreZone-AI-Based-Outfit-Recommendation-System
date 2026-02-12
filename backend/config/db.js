const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Create DB file path
const dbPath = path.resolve(__dirname, '../lorezone.db');

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + dbPath + ': ' + err.message);
  } else {
    console.log('Connected to the SQLite database at ' + dbPath);
  }
});

// Helper to simulate mysql2's promise interface
const promiseInterface = {
  // Simulate pool.query() -> [rows, fields]
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      // Check if it's a SELECT or modifying query
      const trimmedSql = sql.trim().toUpperCase();
      if (trimmedSql.startsWith('SELECT')) {
        db.all(sql, params || [], (err, rows) => {
          if (err) return reject(err);
          resolve([rows, null]); // Matches [rows, fields] signature
        });
      } else {
        db.run(sql, params || [], function (err) {
          if (err) return reject(err);
          // "this" contains { lastID, changes }
          // mysql2 returns [result, fields] where result has insertId, affectedRows
          const result = {
            insertId: this.lastID,
            affectedRows: this.changes,
            warningStatus: 0,
          };
          resolve([result, null]);
        });
      }
    });
  },

  // Simulate pool.execute() -> same as query for sqlite
  execute: (sql, params) => {
    return promiseInterface.query(sql, params);
  },

  // Support pool.promise() pattern if used directly
  promise: () => promiseInterface
};

// If the original code called pool.promise(), we return the interface directly 
// or an object that returns it. 
// Looking at db.js: "const db = pool.promise(); module.exports = db;"
// So we just export the promiseInterface directly.

module.exports = promiseInterface;
