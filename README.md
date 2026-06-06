# QuickChat - Real Time Chat Application

A full-stack real-time chat application built with MERN stack
where users can send text messages and images instantly.

## 🔗 Live Demo
- **Frontend**: https://quick-chat-hdmn.vercel.app
- **Backend**: https://quickchat-backend.onrender.com

---

## ✨ Features
- 🔐 JWT Authentication (Login & Signup)
- 💬 Real Time Messaging using Socket.IO
- 🖼️ Image Sharing in Chat
- 🟢 Online / Offline User Status
- 🔔 Unread Message Badges
- 👤 User Profile Management
- 📱 Responsive Design
- ☁️ Cloud Image Storage with Cloudinary

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js 19 | UI Framework |
| Tailwind CSS v4 | Styling |
| Socket.IO Client | Real Time Communication |
| Axios | HTTP Requests |
| React Router DOM v7 | Routing |
| Vite | Build Tool |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express.js | Server |
| PostgreSQL + Sequelize | Database |
| Socket.IO | Real Time Communication |
| JWT + Bcryptjs | Authentication |
| Cloudinary | Image Storage |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| Neon | PostgreSQL Cloud Database |
| Cloudinary | Image Storage |

---

## ⚙️ Local Setup

### Step 1 — Clone Repository
```bash
git clone https://github.com/yourusername/quickchat.git
cd quickchat
```

### Step 2 — Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

### Step 3 — Environment Variables

**`server/.env`**
```env
PORT=5000
DATABASE_URL=postgresql://username:password@host/chatapp?sslmode=require
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

**`client/.env`**
```env
VITE_BACKEND_URL=http://localhost:5000
```

### Step 4 — Run Application

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

Open **http://localhost:5173** in browser ✅

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/check` | Check auth status | ✅ |
| PUT | `/api/auth/update-profile` | Update profile | ✅ |
| GET | `/api/messages/users` | Get all users | ✅ |
| GET | `/api/messages/:id` | Get conversation | ✅ |
| POST | `/api/messages/send/:id` | Send message | ✅ |
| PUT | `/api/messages/mark/:id` | Mark as seen | ✅ |

---

## 🚀 Deployment

| Service | Configuration |
|---------|--------------|
| Render | Root Directory → `server` |
| Vercel | Root Directory → `client` |
| Neon | Free PostgreSQL cloud database |

---

## 🔮 Future Improvements
- [ ] Search users
- [ ] Typing indicators
- [ ] Message deletion
- [ ] Group chat

---

## 👨‍💻 Author
**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 📄 License
This project is open source under the [MIT License](LICENSE).
