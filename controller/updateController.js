const User = require("../model/userModel.js");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
    const { username, password, email } = req.body;
    const userId = req.params.id;

    try {
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the new email already exists
        if (email !== undefined && email !== existingUser.email) {
            const emailExists = await User.findByEmail(email);
            if (emailExists.kind === 'found') {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        // Check if the new username already exists
        if (username !== undefined && username !== existingUser.username) {
            const usernameExists = await User.findByUsername(username);
            if (usernameExists.kind === 'found') {
                return res.status(400).json({ message: 'Username already exists' });
            }
        }

        if (password !== undefined && password !== null && password !== "") {
            // Check if the new password meets the length requirement
            if (password.length < 7) {
                return res.status(400).json({ message: 'Password is too short (minimum 7 characters)' });
            }

            // Hash the new password before updating
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUser.password = hashedPassword;
        } else if (password === null || password === "") {
            return res.status(400).json({ message: 'Please enter the data correctly' });
        }

        // Update user properties if they exist in the request body
        if (username !== undefined && username !== null && username !== "") {
            existingUser.username = username;
        } else if (username === null || username === "") {
            return res.status(400).json({ message: 'Please enter the data correctly' });
        }

        if (email !== undefined && email !== null && email !== "") {
            existingUser.email = email;
        } else if (email === null || email === "") {
            return res.status(400).json({ message: 'Please enter the data correctly' });
        }

        // Update the user in the database
        await User.updateUser(userId, existingUser);

        return res.status(200).json({ message: 'User updated successfully', user: existingUser });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { updateUser };
