import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';
import apiRouter from './apiRouter.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config({ path: path.resolve('../.env') });
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use('/auth', authRouter);

app.use('/creation', apiRouter);

app.get('/', (req, res) => res.send('API is running'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Статические файлы фронтенда
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all для React SPA
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
        });
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (error) {
        console.error('Server start error:', error);
        process.exit(1);
    }
};

start();
