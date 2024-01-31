import express from 'express';
import http from 'http';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { CircuitModel } from './models/Circuit';

dotenv.config();

const app = express();
const server = http.createServer(app);

// using morgan for logs
app.use(morgan('combined'));

// Start the server
const PORT = process.env.PORT || 8000;

server.listen(PORT, async () => {
    await mongoose.connect(process.env.DATABASE_URI as string);

    console.log(`Server is running on http://localhost:${PORT}`);
});
