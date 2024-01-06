import express from 'express';
import http from 'http';
import { createClient } from '@supabase/supabase-js';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.SUPABASE_URL);

const app = express();
const server = http.createServer(app);

// using morgan for logs
app.use(morgan('combined'));

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// Start the server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
