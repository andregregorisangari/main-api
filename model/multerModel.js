const Multer = require('multer');

const storage = Multer.memoryStorage();
const multer = Multer({
    storage: storage,
    fileSize: 5 * 1024 * 1024
})

module.exports = multer;