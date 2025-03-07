import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import chatRoutes from "./routes/chat";
import authRoutes from "./routes/auth"; 
import userRoutes from "./routes/user"; 
import sequelize from './sequelize'; 

import chatSocket from "./sockets/chatSocket"; 
const app = express();
const server = http.createServer(app); // Initialize HTTP server first

// Initialize Socket.IO server after HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Middleware
app.use(cors({
  origin: "http://localhost:4000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Routes
app.use("/chat", chatRoutes);
app.use("/auth", authRoutes); 
app.use("/user", userRoutes)

// Attach the WebSocket server to the Express app
app.set("socketio", io);
chatSocket(io); // Initialize WebSocket handlers

// Sync Sequelize and start the server
sequelize.sync().then(() => {
  console.log('Database synced successfully');
  if (!server.listening) {
    console.log('Starting server...');
    server.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  } else {
    console.log('Server is already running');
  }
}).catch((error: any) => {
  console.error('Unable to connect to the database:', error);
});

export default server;