# SkillConnect 🚀

> A full-stack professional networking & career platform built with the MERN stack.

SkillConnect bridges the gap between professional networking, job discovery, and skill development — all in one cohesive web application. Think LinkedIn, tailored for students and fresh graduates.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/atlas)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 🔐 **Authentication** | Secure JWT-based registration & login with bcrypt password hashing |
| 👤 **User Profiles** | Rich profiles with experience, education, skills, and Cloudinary-powered photo uploads |
| 📰 **Social Feed** | Create, view, and interact with posts from your network |
| 🤝 **Networking** | Send/accept connection requests and build your professional circle |
| 💼 **Job Board** | Browse, search, and apply for jobs with advanced filters (type, location, date) |
| 📖 **Learning Hub** | Curated courses with category filters and personal progress tracking |
| 💬 **Messaging** | Peer-to-peer text messaging with connection-based access |
| 🔔 **Notifications** | Real-time notification system for connections, messages, and activity |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite 7** — fast, modern UI framework
- **Tailwind CSS 3** — utility-first styling
- **React Router v7** — client-side routing
- **React Icons** — icon library

### Backend
- **Node.js** + **Express 5** — REST API server
- **MongoDB** + **Mongoose** — database and ODM
- **JWT** — stateless authentication
- **Bcryptjs** — password hashing
- **Multer** — file upload middleware
- **Cloudinary** — media storage & CDN

---

## 📁 Project Structure

```
SkillConnect/
├── src/                    # Frontend (React + Vite)
│   ├── components/         # Reusable UI components
│   ├── context/            # AuthContext, global state
│   ├── pages/              # Route-level page components
│   ├── services/           # API service layer
│   └── styles/             # Global CSS
├── server/                 # Backend (Node.js + Express)
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth guard, upload handler
│   ├── models/             # Mongoose schemas (User, Post, Job, ...)
│   └── routes/             # API route definitions
├── public/                 # Static assets
└── Deliverables/           # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** v18+
- **MongoDB Atlas** account (or local MongoDB)
- **Cloudinary** account (for image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/ojaspatilop/SkillConnect.git
cd SkillConnect
```

### 2. Install dependencies
```bash
# Install frontend & shared dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Configure environment variables

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

### 4. Run the application

Open **two separate terminals**:

```bash
# Terminal 1 — Backend
cd server
node index.js
```

```bash
# Terminal 2 — Frontend
npm run dev
```

The app will be available at **https://skill-connect-seven.vercel.app/** with the API running on **http://localhost:5000**.

---

## 📸 Screenshots

> _Coming soon — add screenshots of the Feed, Profile, Jobs, and Learning pages here._

---

## 📄 Documentation

All project deliverables are located in the `/Deliverables` folder:

- Project Charter
- Software Requirements Specification (SRS)
- Software Design Specification (SDS)
- Work Breakdown Structure (WBS)
- Test Plan & Traceability Matrix
- RAID Log & Lessons Learnt

---

## 🤝 Acknowledgements

Built as part of the **IAC GPI Live Project Internship** (Full Stack Development domain).

---

## 📝 License

This project is for educational purposes only.