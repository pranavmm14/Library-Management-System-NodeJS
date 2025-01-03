const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/routes.cjs");
const connectDB = require("./config/db.cjs");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
connectDB(process.env.MONGO_URI);

// Middleware
app.use(express.json());

// Use Routes
app.all("/", (req, res) => res.send("Library Management System Application"));
app.use("/api", routes);

// Connect to MongoDB and Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
