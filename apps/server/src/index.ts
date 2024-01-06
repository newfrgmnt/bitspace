import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createClient } from '@supabase/supabase-js';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.SUPABASE_URL);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// using morgan for logs
app.use(morgan('combined'));

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// API endpoints for managing the graph data
app.get('/api/nodes', (req, res) => {
    // Handle GET request for nodes
    // Return the nodes as JSON
    res.json({ nodes: [] });
});

// WebSocket connection
io.on('connection', socket => {
    console.log('Client connected');

    // Handle changes to the graph and broadcast updates
    socket.on('graphChange', data => {
        // Handle the change in the graph (update, add, delete)
        // Broadcast the changes to all connected clients
        io.emit('graphUpdate', data);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
