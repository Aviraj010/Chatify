import express from "express";
import authRoutes from "./routes/auth.routes.js";

import dotenv from "dotenv";    
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes);

app.listen(PORT, () => { 
    console.log(`Server started on port ${PORT}`);
});

