# 🌐 Communify

A full-stack social networking application built with React and Node.js, featuring user authentication, post creation, and a real-time community feed.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Scripts](#scripts)

---

## ✨ Features

- 🔐 User registration and login with JWT authentication
- 📝 Create, view, and manage posts
- 🌍 Community feed to browse all posts
- 🔒 Secure password hashing with bcrypt
- 📱 Responsive frontend built with React

---

## 🛠 Tech Stack

### Frontend

| Technology       | Version |
| ---------------- | ------- |
| React            | ^19.2.4 |
| React Router DOM | ^7.14.0 |
| Axios            | ^1.14.0 |

### Backend

| Technology         | Version |
| ------------------ | ------- |
| Node.js + Express  | ^4.18.2 |
| MongoDB + Mongoose | ^9.3.3  |
| JSON Web Token     | ^9.0.3  |
| bcryptjs           | ^3.0.3  |
| dotenv             | ^16.3.1 |
| CORS               | ^2.8.6  |

---

## 📁 Project Structure

```
communify/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Login & register routes
│   │   └── posts.js         # Post CRUD routes
│   ├── models/              # Mongoose schemas
│   ├── middleware/          # JWT auth middleware
│   ├── server.js            # Express entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── pages/           # Page-level components
    │   ├── App.js           # Root component & routing
    │   └── index.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/communify.git
cd communify
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder (see [Environment Variables](#environment-variables) below).

Start the backend server:

```bash
node server.js
```

The API will run on `http://localhost:5000`.

### 3. Set Up the Frontend

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`.

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` directory with the following:

```env
MONGO_URI=mongodb://localhost:27017/communify
JWT_SECRET=your_secret_key_here
PORT=5000
```

| Variable     | Description                                 |
| ------------ | ------------------------------------------- |
| `MONGO_URI`  | MongoDB connection string (local or Atlas)  |
| `JWT_SECRET` | Secret key used to sign JWT tokens          |
| `PORT`       | Port for the Express server (default: 5000) |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 🚢 Deployment

This app is deployed with the **frontend on Vercel** and the **backend on Render**.

---

### 🔵 Backend — Render

1. Push your `backend/` folder to a GitHub repository
2. Go to [render.com](https://render.com) and click **New → Web Service**
3. Connect your GitHub repo and select the `backend` folder (or root if backend is at root)
4. Fill in the following settings:

| Setting           | Value            |
| ----------------- | ---------------- |
| **Environment**   | `Node`           |
| **Build Command** | `npm install`    |
| **Start Command** | `node server.js` |

5. Under **Environment Variables**, add:

| Key          | Value                                |
| ------------ | ------------------------------------ |
| `MONGO_URI`  | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Your secret key                      |
| `PORT`       | `5000`                               |

6. Click **Deploy** — Render will give you a live URL like `https://communify-api.onrender.com`

> ⚠️ **Use MongoDB Atlas** (not localhost) for your `MONGO_URI` when deploying. Local MongoDB is not accessible from the cloud.

---

### ⚫ Frontend — Vercel

1. Push your `frontend/` folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click **New Project**
3. Import your GitHub repo and set the **Root Directory** to `frontend/`
4. Vercel will auto-detect Create React App — no build settings needed
5. Under **Environment Variables**, add:

| Key                 | Value                                                               |
| ------------------- | ------------------------------------------------------------------- |
| `REACT_APP_API_URL` | Your Render backend URL (e.g. `https://communify-api.onrender.com`) |

6. Click **Deploy** — your app will be live at `https://communify.vercel.app`

> 💡 Make sure all API calls in the frontend use `process.env.REACT_APP_API_URL` as the base URL instead of hardcoded `http://localhost:5000`.

---

### 🔗 Connecting Frontend to Backend

In your frontend Axios config or API calls, use:

```javascript
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});
```

This ensures the app works both in local development and in production.

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint             | Description                 | Auth Required |
| ------ | -------------------- | --------------------------- | ------------- |
| POST   | `/api/auth/register` | Register a new user         | No            |
| POST   | `/api/auth/login`    | Login and receive JWT token | No            |

### Post Routes — `/api/posts`

| Method | Endpoint         | Description       | Auth Required |
| ------ | ---------------- | ----------------- | ------------- |
| GET    | `/api/posts`     | Get all posts     | No            |
| POST   | `/api/posts`     | Create a new post | Yes           |
| DELETE | `/api/posts/:id` | Delete a post     | Yes           |

---

## 📜 Scripts

### Backend

| Command          | Description      |
| ---------------- | ---------------- |
| `node server.js` | Start the server |

### Frontend

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm start`     | Start the development server |
| `npm run build` | Build for production         |
| `npm test`      | Run test suite               |

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

_Built with using React, Node.js, and MongoDB_
