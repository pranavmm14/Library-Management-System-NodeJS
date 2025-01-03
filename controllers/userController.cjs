const User = require("../models/User.cjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/jwt.cjs");

exports.registerUser = async (req, res) => {
    const { name, username, password, email, mobile, isAdmin } = req.body;
    try {
        const newUser = new User({
            name,
            username,
            password,
            email,
            mobile,
            admin: isAdmin === true,
        });

        await newUser.save();
        res.status(201).send("User Registered");
    } catch (err) {
        res.status(500).send("Error registering user");
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
        return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
    res.json({ token });
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) {
        return res.status(404).send("No Users Found");
    } else {
        res.status(200).json(users);
    }
};
