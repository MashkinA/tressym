import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';
import apiRouter from './apiRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve('../.env') });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://178.72.150.36'],
    credentials: true
}));

app.use('/auth', authRouter);
app.use('/creation', apiRouter);

// Статика из dist
app.use(express.static(path.join(__dirname, '../dist')));

// Catch-all для SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Обработчик ошибок
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

// Подключение к MongoDB и запуск сервера
const start = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000
        });
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (error) {
        console.error('Server start error:', error);
        process.exit(1);
    }
};

start();
