"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const chat_1 = __importDefault(require("./routes/chat"));
const auth_1 = __importDefault(require("./routes/auth"));
const sequelize_1 = __importDefault(require("./sequelize"));
const chatSocket_1 = __importDefault(require("./sockets/chatSocket"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // Initialize HTTP server first
// Initialize Socket.IO server after HTTP server
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    },
});
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:4000", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
// Routes
app.use("/chat", chat_1.default);
app.use("/auth", auth_1.default); // Use the auth routes
// Attach the WebSocket server to the Express app
app.set("socketio", io);
(0, chatSocket_1.default)(io); // Initialize WebSocket handlers
// Sync Sequelize and start the server
sequelize_1.default.sync().then(() => {
    console.log('Database synced successfully');
    if (!server.listening) {
        console.log('Starting server...');
        server.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        });
    }
    else {
        console.log('Server is already running');
    }
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
exports.default = server;
