const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const bearerToken = bearerHeader.split(" ")[1];
        const decoded = jwt.verify(bearerToken, config.ACCESS_TOKEN_SECRET);
        req.user = decoded.username;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
