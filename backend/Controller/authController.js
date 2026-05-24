const User = require('../models/User');

// SIGNUP LOGIC
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, message: "Email already exists!" });

        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error during registration." });
    }
};

// LOGIN LOGIC
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "User not found!" });

        if (user.password !== password) return res.status(400).json({ success: false, message: "Invalid password!" });

        res.status(200).json({ success: true, message: "Login successful!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error during login." });
    }
};