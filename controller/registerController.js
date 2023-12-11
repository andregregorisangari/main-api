const User = require("../model/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleNewUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    if (!email || !username || !password) {
        return res.status(400).json({ message: "all fields are required!" });
    } else if (password.length <= 7) {
        return res.status(400).json({ message: "password is too short" });
    }

    try {
        // Check if the username already exists
        const usernameExists = await User.findByUsername(username);
        if (usernameExists.kind === "found") {
            return res.status(409).send({
                message: "Username already exists",
            });
        }

        // Check if the email already exists
        const duplicateEmail = await User.findByEmail(email);
        if (duplicateEmail.kind === "found") {
            return res.status(409).send({
                message: "Email already exists",
            });
        }

        // Hashing password
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = { username: username, password: hashedPwd, email: email };

        User.createUser(newUser, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message,
                });
            } else {
                res.status(201).send({
                    message: "User created successfully",
                });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };