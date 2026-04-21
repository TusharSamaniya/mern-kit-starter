// ============================================================
// index.js  (ROOT — starts the server)
// ============================================================

import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // ← must be FIRST before anything reads process.env

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import connectToMongo from './db.js';
import logger from './logger/index.js';

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoute.js';
import supportRoutes from './routes/supportRoutes.js';

// Error middleware — must be imported and used LAST
import { notFound, errorHandler } from './middleware/index.js';

const PORT = process.env.PORT || 4000;
const app = express();

// Connect to database
connectToMongo();

// ---- MIDDLEWARE ----
app.use(morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
}));

app.use((req, res, next) => {
    req.setTimeout(15000);
    next();
});

const whitelist = [
    'http://localhost:3000',
    'http://localhost:4000',
    'http://192.168.31.114:3000',
    process.env.DOMAIN,
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// ---- ROUTES ----
app.use('/api/auth', userRoutes);
app.use('/api/admin/', adminRoutes);
app.use('/api/support/', supportRoutes);

// Health check — open browser at http://localhost:4000/api/health to test
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running!',
        environment: process.env.NODE_ENV,
    });
});

// ---- ERROR HANDLERS (always last) ----
app.use(notFound);
app.use(errorHandler);

// ---- START ----
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Frontend domain: ${process.env.DOMAIN}`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV}`);
});