import 'reflect-metadata';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

// using morgan for logs
app.use(morgan('combined'));

// Start the server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
