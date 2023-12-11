const express = require("express");
const router = express();
const auth = require("../controller/auth");

// METHOD GET
router.get("/users", auth, (req, res) => {
    res.status(200).send({
        username: req.user,
    });
});

module.exports = router;
