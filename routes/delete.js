const express = require('express');
const router = express.Router();
const deleteController = require('../controller/deleteController');

//METHOD DELETE
router.delete("/users/:id", deleteController.deleteUser);

module.exports = router;