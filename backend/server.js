import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express(); 
dotenv.config();

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;


connectToMongoDB();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


// app.get('/', (req, res) => {
//     res.send("Hello world!");
// });




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
