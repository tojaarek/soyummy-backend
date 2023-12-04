const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: path.join(__dirname, '..', 'uploads'),
  limits: {
    fileSize: 3145728,
  },
});

module.exports = {
  upload,
};
