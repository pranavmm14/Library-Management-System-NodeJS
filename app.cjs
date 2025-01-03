const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/routes.cjs");
const connectDB = require("./config/db.cjs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
connectDB(process.env.MONGO_URI);

// Middleware to serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware for JSON parsing
app.use(express.json());

// Route for index.html
app.all("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// Use API Routes
app.use("/api", routes);

// Connect to MongoDB and Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
