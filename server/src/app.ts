import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat';
// import authRoutes from './routes/auth';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/chat', chatRoutes);
// app.use('/auth', authRoutes);

export default app;