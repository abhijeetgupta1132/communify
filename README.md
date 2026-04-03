# Communify 🌐

> A modern full-stack social media platform where users can connect, share posts, like and comment in a beautiful community feed.

![Communify](https://img.shields.io/badge/Communify-Social%20Platform-667eea?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Deployed](https://img.shields.io/badge/Deployed-Vercel%20%2B%20Render-black?style=flat-square&logo=vercel)

---

## 🔗 Live Demo

| Service            | URL                                                                |
| ------------------ | ------------------------------------------------------------------ |
| 🌐 **Frontend**    | [communify-dif8.vercel.app](https://communify-dif8.vercel.app)     |
| ⚙️ **Backend API** | [communify-wizt.onrender.com](https://communify-wizt.onrender.com) |

---

## ✨ Features

- 🔐 **Authentication** — Secure signup & login with JWT tokens
- 🔒 **Password Security** — bcrypt hashing (never stored in plain text)
- 📝 **Create Posts** — Share text, images, or both
- 🌍 **Public Feed** — See all posts from all users in real time
- ❤️ **Like System** — Like/unlike posts with instant UI update
- 💬 **Comments** — Comment on any post, see all replies
- 🔍 **Search** — Search posts and users instantly
- 📊 **Filter Tabs** — Sort by All Posts, Most Liked, Most Commented
- 🔗 **Share Posts** — Copy post link to clipboard with toast notification
- 📱 **Responsive Design** — Works on mobile and desktop
- 🎨 **Premium UI** — Glassmorphism auth page, animated gradient background, smooth hover effects

---

## 🛠 Tech Stack

### Frontend

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| React 19         | UI Framework                 |
| React Router DOM | Client-side routing          |
| Axios            | HTTP requests                |
| CSS3             | Custom styling (no Tailwind) |

### Backend

| Technology         | Purpose               |
| ------------------ | --------------------- |
| Node.js            | Runtime environment   |
| Express.js 4       | REST API framework    |
| MongoDB + Mongoose | Database & ODM        |
| JSON Web Token     | Auth token generation |
| bcryptjs           | Password hashing      |
| dotenv             | Environment config    |
| CORS               | Cross-origin requests |

### Deployment

| Service       | Purpose          |
| ------------- | ---------------- |
| Vercel        | Frontend hosting |
| Render        | Backend hosting  |
| MongoDB Atlas | Cloud database   |

---

## 📁 Project Structure

```
communify/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema (username, email, password)
│   │   └── Post.js          # Post schema (text, image, likes, comments)
│   ├── routes/
│   │   ├── auth.js          # POST /signup, POST /login
│   │   └── posts.js         # GET/POST posts, like, comment
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── server.js            # Express entry point
│   ├── .env                 # Environment variables (gitignored)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js        # Top navigation bar
    │   │   └── PostCard.js      # Individual post with like/comment
    │   ├── pages/
    │   │   ├── Login.js         # Login page
    │   │   ├── Signup.js        # Registration page
    │   │   └── Feed.js          # Main social feed
    │   ├── App.js               # Root component & routing
    │   ├── App.css              # All styles
    │   └── index.js
    └── package.json
```

---

## 🗄️ Database Design

Only **2 MongoDB collections** as required:

### Users Collection

```json
{
  "_id": "ObjectId",
  "username": "string (unique)",
  "email": "string (unique)",
  "password": "string (hashed with bcrypt)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Posts Collection

```json
{
  "_id": "ObjectId",
  "author": "string",
  "authorId": "ObjectId",
  "text": "string",
  "image": "string (base64)",
  "likes": ["username1", "username2"],
  "comments": [
    {
      "user": "string",
      "text": "string",
      "createdAt": "Date"
    }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 📡 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint           | Description                    | Auth Required |
| ------ | ------------------ | ------------------------------ | ------------- |
| POST   | `/api/auth/signup` | Register new user, returns JWT | ❌            |
| POST   | `/api/auth/login`  | Login user, returns JWT        | ❌            |

### Posts — `/api/posts`

| Method | Endpoint                 | Description                  | Auth Required |
| ------ | ------------------------ | ---------------------------- | ------------- |
| GET    | `/api/posts`             | Get all posts (newest first) | ❌            |
| POST   | `/api/posts`             | Create new post              | ✅            |
| PUT    | `/api/posts/:id/like`    | Like or unlike a post        | ✅            |
| POST   | `/api/posts/:id/comment` | Add comment to post          | ✅            |

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js v16+
- MongoDB (local) or MongoDB Atlas account
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/communify.git
cd communify
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/communify
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start backend:

```bash
node server.js
# ✅ MongoDB Connected!
# ✅ Server running on port 5000
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
# Opens at http://localhost:3000
```

---

## 🚢 Deployment Guide

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect GitHub repo, set root to `backend/`
4. Build: `npm install` | Start: `node server.js`
5. Add environment variables:
   - `MONGO_URI` = MongoDB Atlas connection string
   - `JWT_SECRET` = your secret key
   - `PORT` = 5000

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Connect GitHub repo, set root to `frontend/`
3. Add environment variable:
   - `REACT_APP_API_URL` = your Render backend URL
4. Deploy!

> ⚠️ Use **MongoDB Atlas** (not localhost) for production deployment.

---

## 🔐 Security Features

- Passwords hashed with **bcrypt** (salt rounds: 10)
- **JWT tokens** expire after 7 days
- Protected routes require `Authorization: Bearer <token>` header
- `.env` file is **gitignored** — secrets never pushed to GitHub
- CORS configured for cross-origin requests

---

## 🎨 UI Highlights

- Animated gradient background on auth pages
- Glassmorphism card effect on login/signup
- Smooth hover animations on all interactive elements
- Purple gradient theme throughout
- Toast notifications instead of browser alerts
- Floating action button (+) for creating posts
- Filter tabs for sorting feed content
- Responsive layout for all screen sizes

---

## 📜 Scripts

### Backend

```bash
node server.js       # Start server
```

### Frontend

```bash
npm start            # Development server
npm run build        # Production build
```

---

## 👨‍💻 Author

**Abhijeet Gupta**

- Built as part of **3W Full Stack Internship Assignment**
- Tech: React.js + Node.js + Express.js + MongoDB

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

_Built using React, Node.js, Express.js, and MongoDB_
