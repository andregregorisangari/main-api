const express = require("express");
const router = express.Router();
const registerController = require("../controller/registerController");

// METHOD POST
router.post("/", registerController.handleNewUser);

router.all("/", (req, res) => {
    res.status(404).send("resource not found");
});

module.exports = router;
