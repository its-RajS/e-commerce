//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//Utiles
import connectDB from "./config/db.js";
import userRoutes from "../backend/routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 3000;

connectDB();

const app = express();

//handle JSON data in incoming req.
app.use(express.json());
//parsing the form data, sent in URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server running: ${port}`));
