const User = require("../model/userModel.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({
                message: "email and password are required.",
            });

        const foundUser = await User.findByEmail(email);
        if (
            foundUser.kind === "found" &&
            (await bcrypt.compare(password, foundUser.password))
        ) {
            const token = jwt.sign(
                { email: foundUser.email, username: foundUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "2h" }
            );

            res.status(200).json({
                message: "login successfull",
                loginResult: {
                    email: email,
                    username: foundUser.username,
                    token: token,
                },
            });
        } else {
            res.status(400).json({
                message: "Invalid Credentials",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { handleLogin };
