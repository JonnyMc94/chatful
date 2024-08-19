import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import chatRoutes from './routes/chat';
import chatSocket from './sockets/chatSocket'; // Import the WebSocket handlers

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/chat', chatRoutes);

// Attach the WebSocket server to the Express app
app.set('socketio', io);
chatSocket(io); // Initialize WebSocket handlers

export default server; // Export the server instead of the app