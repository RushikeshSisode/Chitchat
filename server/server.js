import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import { db } from "./dbconfig/db.config.js";
import userRouter from "./Routes/user.Routes.js";
import messageRouter from "./Routes/message.Routes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// ✅ ADD THIS
const FRONTEND_URL = process.env.FRONTEND_URL

export const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,       // ✅ changed
    credentials: true,
  },
});

export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;

  userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use(express.json({ limit: "4mb" }));
app.use(cors({
  origin: FRONTEND_URL,         // ✅ changed
  credentials: true,
}));

app.get("/api/status", (req, res) => {
  res.status(200).json({ success: true, message: "Server is live 🚀" });
});

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db();
    console.log("Database connected");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();