//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//Utiles
import connectDB from "./config/db.js";
import userRoutes from "../backend/routes/userRoutes.js";

//This Index.js is our Server

//To use the .env file we need to load it and to use its variables we use process.env.__variablename__
dotenv.config();
const port = process.env.PORT || 3000;

//To connnect to the Database here the database is MongoDB
connectDB();

const app = express();

//handle JSON data in incoming req.
app.use(express.json());
//parsing the form data, sent in URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

///create my own api endpoint
//In the userRoutes we can do all the stuff we wanna do with the user
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server running: ${port}`));
