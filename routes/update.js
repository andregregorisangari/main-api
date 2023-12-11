const express = require('express');
const router = express.Router();
const updateController = require('../controller/updateController');

//METHOD PATCH
router.patch("/users/:id", updateController.updateUser);

module.exports = router;