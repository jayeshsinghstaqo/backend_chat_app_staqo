import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRoutes from "./backend/routes/auth.routes.js";
import messageRoutes from "./backend/routes/message.routes.js";
import userRoutes from "./backend/routes/user.routes.js";

import connectToMongoDB from "./backend/db/connectToMongoDB.js";
import { app, server } from "./backend/socket/socket.js";

const PORT = process.env.PORT || 5000;


dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
