# LoreZone – Smart Outfit Recommendation System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen)](https://astonishing-travesseiro-449987.netlify.app/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-orange)](https://www.mysql.com/)

LoreZone is an intelligent **outfit recommendation system** that provides personalized clothing suggestions based on user characteristics including **skin tone, height, occasion, and budget**. Beyond outfit recommendations, it serves as a comprehensive fashion platform featuring **ongoing offers**, **fashion events**, **career opportunities**, and **trending styles**.

## Live Demo

**Visit the live application:** [https://astonishing-travesseiro-449987.netlify.app/](https://astonishing-travesseiro-449987.netlify.app/)

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

---

## Features

### Smart Outfit Recommendation
- **Personalized suggestions** based on:
  -  Skin tone
  -  Height
  -  Occasion (casual, formal, party, etc.)
  -  Price range/budget

### Offers & Deals
- Real-time display of **ongoing fashion offers** from various brands
- **Price comparison** and discount tracking
- **Brand-specific deals** and promotions

### Fashion Events
- Comprehensive listing of **upcoming fashion events**
- **Event details** including dates, venues, and registration info
- Stay updated with the latest fashion shows and exhibitions

### Career Opportunities (Dream Big)
- Curated list of **fashion industry job openings**
- **Career opportunities** in design, retail, and fashion tech
- Direct application links and job requirements

### Trending Styles & News
- Latest **fashion trends** and style inspiration
- **Fashion news** and industry updates
- **Seasonal trends** and styling tips

### Watch Me (Community Showcase)
- User-generated content platform
- Share and discover **popular looks**
- Browse **outfit inspiration** from the community
- Interactive **photo gallery** of fashion enthusiasts

### Brands Near You
- Discover local fashion stores and boutiques
- Location-based brand recommendations
- Store details and contact information

### User Features
- User authentication and profile management
- Personalized dashboard
- Save favorite outfits and brands
- Comment and engage with community posts

---

## Tech Stack

### Frontend
- **React.js** (v19.0.0) - UI framework
- **React Router DOM** (v7.4.0) - Navigation
- **React Bootstrap** (v2.10.9) - UI components
- **React Icons** (v5.5.0) - Icon library
- **Firebase** (v11.5.0) - Authentication & storage
- **CSS3** - Custom styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v4.21.2) - Web framework
- **Sequelize** (v6.37.7) - ORM for MySQL
- **MySQL2** (v3.14.0) - Database driver
- **Multer** (v1.4.5) - File upload handling
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **dotenv** (v16.4.7) - Environment variables
- **Morgan** (v1.10.0) - HTTP request logger
- **Axios** - HTTP client for API requests

### Database & Cloud Services
- **MySQL** - Relational database management
- **AWS RDS** - Cloud database hosting
- **AWS S3** - Cloud storage for images and media files

### Deployment
- **Frontend:** Netlify
- **Backend:** Render
- **Database:** AWS RDS (MySQL)
- **Storage:** AWS S3

---

## Project Structure

```
LoreZone/
├── frontend/                  # React frontend application
│   ├── public/               # Static files
│   │   ├── images/          # Image assets
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js
│   │   │   ├── Navbar.js
│   │   │   ├── Login.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── profile.js
│   │   │   ├── Explore.js
│   │   │   ├── Brandsnearyou.js
│   │   │   ├── Events.js
│   │   │   ├── DreamBig.js
│   │   │   ├── Trends.js
│   │   │   ├── WatchMe.js
│   │   │   └── PostPage.js
│   │   ├── styles/          # CSS modules
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   └── package.json
│
├── backend/                  # Node.js backend API
│   ├── config/              # Configuration files
│   │   ├── db.js           # Database connection
│   │   └── dotenv.js       # Environment config
│   ├── controllers/         # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── postController.js
│   │   ├── userspostController.js
│   │   ├── brandController.js
│   │   ├── companyController.js
│   │   ├── eventController.js
│   │   ├── dreamBigController.js
│   │   ├── trendController.js
│   │   ├── watchMeController.js
│   │   └── commentController.js
│   ├── models/              # Database models
│   │   ├── userModel.js
│   │   ├── postModel.js
│   │   ├── userspostModels.js
│   │   ├── brandModel.js
│   │   ├── companyModel.js
│   │   ├── eventModel.js
│   │   ├── dreamBigModel.js
│   │   ├── trendModel.js
│   │   ├── watchMeModel.js
│   │   └── commentModel.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── postRoutes.js
│   │   ├── userspostRoutes.js
│   │   ├── brandRoutes.js
│   │   ├── companyRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── dreamBigRoutes.js
│   │   ├── trendRoutes.js
│   │   ├── watchmeRoutes.js
│   │   └── commentRoutes.js
│   ├── middlewares/         # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── utils/               # Utility functions
│   │   ├── generateToken.js
│   │   └── hashPassword.js
│   ├── uploads/             # Uploaded files
│   ├── server.js            # Server entry point
│   └── package.json
│
└── README.md                # Project documentation
```

---

## Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)
- **Git**

### Clone the Repository

```bash
git clone https://github.com/Bhargavk055/LoreZone-AI-Based-Outfit-Recommendation-System.git
cd LoreZone-AI-Based-Outfit-Recommendation-System
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the example below and add your configuration
```

**Backend .env Configuration:**
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=lorezone
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

```bash
# Start the backend server
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file for frontend (if needed)
```

**Frontend .env Configuration (optional):**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
```

```bash
# Start the development server
npm start
```

The application will open in your browser at `http://localhost:3000`

### Database Setup

```sql
-- Create database
CREATE DATABASE lorezone;

-- Use the database
USE lorezone;

-- Tables will be created automatically by Sequelize when you start the backend
```

---

## Usage

1. **Register/Login**: Create an account or login to access personalized features
2. **Explore**: Browse through different sections:
   - **Home**: Get outfit recommendations
   - **Brands Near You**: Find local fashion stores
   - **Events**: Check upcoming fashion events
   - **Dream Big**: Explore career opportunities
   - **Trends**: Stay updated with latest fashion trends
   - **Watch Me**: View community posts and share your style
3. **Profile**: Manage your account and saved preferences
4. **Post**: Share your outfit photos and engage with the community

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### User Posts
- `GET /api/usersposts` - Get all user posts
- `POST /api/usersposts` - Create user post
- `GET /api/usersposts/:id` - Get specific user post

### Brands
- `GET /api/brands` - Get all brands
- `POST /api/brands` - Add new brand
- `GET /api/brands/:id` - Get brand details

### Companies
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Add new company

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event details

### Dream Big (Jobs)
- `GET /api/dreambig` - Get all job opportunities
- `POST /api/dreambig` - Post new opportunity

### Trends
- `GET /api/trends` - Get all trends
- `POST /api/trends` - Add new trend

### Watch Me
- `GET /api/watchme` - Get all watch me posts
- `POST /api/watchme` - Create watch me post

### Comments
- `GET /api/comments/:postId` - Get post comments
- `POST /api/comments` - Add new comment
- `DELETE /api/comments/:id` - Delete comment

---

