const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes.cjs");
const app = express();

// Middleware
app.use(express.json());

// Use Routes
app.all('/', (req, res) => res.send("Library Management System Application"));
app.use("/api", routes);

// Connect to MongoDB and Start Server
mongoose
    .connect("mongodb://127.0.0.1:27017/library", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => console.error(err));
