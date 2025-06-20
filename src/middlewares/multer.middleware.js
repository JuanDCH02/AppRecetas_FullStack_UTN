const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'app-stock copy\client\public');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // evita conflictos de nombres
  }
});

const upload = multer({ storage });

module.exports = upload;
