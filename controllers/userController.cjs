const User = require("../models/User.cjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

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
    try {
        if(!req.header("Authorization")){
            return res.status(403).send("Access denied. Admins only.")
        }
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, secretKey); // Use secretKey from config
        const user = await User.findById(decoded.id);

        // Check if the user is an admin
        if (!user || !user.admin) {
            return res.status(403).send("Access denied. Admins only.");
        }

        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).send("No Users Found");
        } else {
            res.status(200).json(users);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
};
