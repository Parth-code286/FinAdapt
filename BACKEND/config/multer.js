const multer = require('multer');
const crypto = require('crypto');
const path = require('path'); // ✅ FIXED

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, name) {
      if (err) return cb(err); // ✅ handle error
      const fn = name.toString('hex') + path.extname(file.originalname); // ✅ preserves .jpg/.png
      req.fileUrl = `${req.protocol}://${req.get('host')}/uploads/${fn}`;
      cb(null, fn);
    });
  }
});

const upload = multer({ storage: storage });
module.exports = upload;