# Chitchat 💬

A full-stack real-time chat application built with the MERN ecosystem, enabling instant messaging, image sharing, and live user status updates.

## 🚀 Live Demo

https://chitchat-flax.vercel.app

## ✨ Features

* JWT Authentication
* Real-Time Messaging with Socket.IO
* Image Sharing
* Online/Offline User Status
* Unread Message Notifications
* User Profile Management
* Responsive Design

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, Vite, Axios, Socket.IO Client, React Router

**Backend:** Node.js, Express.js, PostgreSQL, Sequelize, Socket.IO, JWT, Bcryptjs

**Deployment:** Vercel, Render, Neon, Cloudinary

## ⚙️ Installation

```bash
git clone https://github.com/yourusername/quickchat.git
cd quickchat

# Install dependencies
cd server && npm install
cd ../client && npm install
```

## ▶️ Run Locally

```bash
# Backend
cd server
npm start

# Frontend
cd client
npm run dev
```

## 🔌 API Routes

* POST `/api/auth/signup`
* POST `/api/auth/login`
* GET `/api/auth/check`
* PUT `/api/auth/update-profile`
* GET `/api/messages/users`
* GET `/api/messages/:id`
* POST `/api/messages/send/:id`

## 🔮 Future Improvements

* Search Users
* Typing Indicators
* Message Deletion
* Group Chat

## 👨‍💻 Author

**Rushikesh Sisode**
