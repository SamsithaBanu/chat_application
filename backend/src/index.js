import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import messageRoutes from './routes/message.route.js'
import cors from "cors";
import { app, server } from './lib/socket.js';
import path from 'path'

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json({ limit: "10mb" })); // Increase limit for large images

app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/message',messageRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/vite-project/dist")));


    app.get("*",(req, res)=>{
        res.sendFile(path.join(__dirname,'../frontend/vite-project','dist','index.html'));
    })
}

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});