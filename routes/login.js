const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

// METHOD POST
router.post("/", loginController.handleLogin);

module.exports = router;
