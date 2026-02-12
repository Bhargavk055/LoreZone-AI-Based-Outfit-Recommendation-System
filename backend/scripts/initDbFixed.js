const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../lorezone.db');

// Delete existing DB if exists (to ensure clean slate)
if (fs.existsSync(dbPath)) {
  try {
    fs.unlinkSync(dbPath);
    console.log("Old database deleted.");
  } catch (err) {
    console.error("Error deleting old database:", err.message);
  }
}

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

  // 3. Events (Updated Schema for Frontend)
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_name TEXT,
    event_date TEXT,
    event_time TEXT,
    location TEXT,
    description TEXT,
    ticket_price REAL,
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
    dream_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_name TEXT,
    location TEXT,
    compensation TEXT,
    experience TEXT,
    height TEXT,
    gender TEXT,
    body_type TEXT,
    phone_number TEXT,
    required_skills TEXT
  )`);

  // 6. Users
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 7. Comments
  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    username TEXT,
    comment_text TEXT,
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
    ('Sophia', '/images/sophia_style.png', 'Fair', '170cm', 'Female', 'Slim', 'Casual', 'Boho Chic', 85.00, 'Loving this sunny garden vibe! 🌸 #SummerStyle', 45),
    ('Daniel', '/images/daniel_style.png', 'Medium', '180cm', 'Male', 'Athletic', 'Party', 'Smart Casual', 150.00, 'Evening ready. 🏙️ #CityLights', 62),
    ('Jenna', '/images/watchme1.avif', 'Fair', '175cm', 'Female', 'Slim', 'Summer', 'Casual', 80.00, 'Rocking my new summer outfit! #OOTD', 12),
    ('Lisa', '/images/watchme2.jpg', 'Tan', '165cm', 'Female', 'Average', 'Beach', 'Vacation', 45.00, 'Beach vibes only 🌸🏖️ #BeachFashion', 45),
    ('Mike', '/images/watchme3.avif', 'Medium', '180cm', 'Male', 'Athletic', 'Casual', 'Urban', 60.00, 'City walk look 😎 #UrbanStyle', 30),
    ('Emma', '/images/watchme4.jpg', 'Fair', '168cm', 'Female', 'Average', 'Party', 'Chic', 150.00, 'Sunset chic 🌅 #GoldenHourGlow', 120),
    ('Alex', '/images/watchme5.avif', 'Olive', '172cm', 'Male', 'Slim', 'Casual', 'Relaxed', 55.00, 'Casual Saturday feels 👟 #RelaxedStyle', 18)
  `);

  // Seed Events
  db.run(`INSERT INTO events (organization_name, event_date, event_time, location, description, ticket_price, image_url) VALUES 
    ('Fashion Week NYC', '2026-03-01', '10:00 AM', 'NYC', 'Annual fashion week showcasing top designers.', 150.00, 'https://via.placeholder.com/300'),
    ('Met Gala Watch Party', '2026-05-04', '06:00 PM', 'Los Angeles', 'Watch the Met Gala live with fashion enthusiasts.', 50.00, 'https://via.placeholder.com/300')
  `);

  // Seed Brands
  db.run(`INSERT INTO brands (brand_name, category, description, logo_url) VALUES 
    ('Gucci', 'Luxury', 'Italian luxury brand.', 'https://via.placeholder.com/100')
  `);

  // Seed Dream Big
  db.run(`INSERT INTO dream_big (organization_name, location, compensation, experience, height, gender, body_type, phone_number, required_skills) VALUES 
    ('Vogue India', 'Mumbai', '50000', '2 Years', '170cm', 'Female', 'Slim', '9876543210', 'Modeling,Communication'),
    ('Zara', 'Delhi', '45000', '1 Year', '175cm', 'Male', 'Athletic', '9123456789', 'Runway Walk,Posing'),
    ('H&M', 'Bangalore', '40000', 'Fresher', '165cm', 'Female', 'Average', '9988776655', 'Photogenic,Confident')
  `);


  console.log("Database initialized and seeded.");
});

db.close();
