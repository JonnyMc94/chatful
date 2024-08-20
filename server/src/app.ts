import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import chatRoutes from "./routes/chat";
import authRoutes from "./routes/auth"; // Import the auth routes

import chatSocket from "./sockets/chatSocket"; // Import the WebSocket handlers

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/chat", chatRoutes);
app.use("/auth", authRoutes); // Use the auth routes

// Attach the WebSocket server to the Express app
app.set("socketio", io);
chatSocket(io); // Initialize WebSocket handlers

export default server; // Export the server instead of the app
