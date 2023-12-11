const User = require("../model/userModel.js");

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.deleteUser(id);

        if (result.kind === 'deleted') {
            res.json({
                message: 'DELETE user success'
            });
        } else if (result.kind === 'not_found') {
            res.status(404).json({
                message: 'User not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        });
    }
}

module.exports = { deleteUser };
