const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../lorezone.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log("Initializing database...");

  // 1. Trends
  db.run(`CREATE TABLE IF NOT EXISTS trends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trend_type TEXT,
    style_name TEXT,
    description TEXT,
    style_pic_url TEXT
  )`);

  // 2. Posts
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    pic_url TEXT,
    skin_tone TEXT,
    height TEXT,
    gender TEXT,
    body_type TEXT,
    occasion TEXT,
    theme TEXT,
    price REAL,
    post_description TEXT,
    likes_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 3. Events
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_name TEXT,
    date TEXT,
    location TEXT,
    description TEXT,
    image_url TEXT
  )`);

  // 4. Brands
  db.run(`CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_name TEXT,
    category TEXT,
    description TEXT,
    logo_url TEXT
  )`);

  // 5. Dream Big (Jobs)
  db.run(`CREATE TABLE IF NOT EXISTS dream_big (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_title TEXT,
    company TEXT,
    location TEXT,
    description TEXT,
    apply_link TEXT
  )`);

  // 6. Users
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // --- SEED DATA ---

  // Seed Trends
  db.run(`INSERT INTO trends (trend_type, style_name, description, style_pic_url) VALUES 
    ('Summer', 'Floral Dress', 'A breezy floral dress perfect for summer.', 'https://via.placeholder.com/300'),
    ('Winter', 'Wool Coat', 'Warm and stylish wool coat.', 'https://via.placeholder.com/300')
  `);

  // Seed Posts
  db.run(`INSERT INTO posts (user_id, pic_url, skin_tone, height, gender, body_type, occasion, theme, price, post_description, likes_count) VALUES 
    ('user1', 'https://via.placeholder.com/400', 'Fair', '170cm', 'Female', 'Slim', 'Casual', 'Streetwear', 50.00, 'My casual weekend look!', 10),
    ('user2', 'https://via.placeholder.com/400', 'Medium', '180cm', 'Male', 'Athletic', 'Party', 'Formal', 120.00, 'Ready for the gala.', 25)
  `);

  // Seed Events
  db.run(`INSERT INTO events (event_name, date, location, description, image_url) VALUES 
    ('Fashion week', '2026-03-01', 'NYC', 'Annual fashion week.', 'https://via.placeholder.com/300')
  `);

  // Seed Brands
  db.run(`INSERT INTO brands (brand_name, category, description, logo_url) VALUES 
    ('Gucci', 'Luxury', 'Italian luxury brand.', 'https://via.placeholder.com/100')
  `);

  // Seed Dream Big
  db.run(`INSERT INTO dream_big (job_title, company, location, description, apply_link) VALUES 
    ('Fashion Designer', 'Zara', 'Remote', 'Design new collections.', 'http://example.com')
  `);


  console.log("Database initialized and seeded.");
});

db.close();
