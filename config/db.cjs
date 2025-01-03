const mongoose = require("mongoose");

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
