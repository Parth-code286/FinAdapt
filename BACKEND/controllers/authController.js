const generateToken = require('../utils/generateToken');
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;

    // Check for duplicate user
    const duplicateUser = await userModel.findOne({ email });
    if (duplicateUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    // Generate salt and hash password
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(500).json({ message: 'Bcrypt salt error: ' + err.message });
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else {
          // Create user with hashed password
          const userCreated = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          // Generate token
          const token = generateToken(userCreated._id);

          // Set optional httpOnly cookie (optional: you can keep or remove)
          res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false, // Set to true if using HTTPS
          });

          // ✅ Send token + user back in response body
          return res.status(201).json({
            message: "✅ User registered",
            data: {
              token,
              user: {
                _id: userCreated._id,
                fullname: userCreated.fullname,
                email: userCreated.email,
              }
            }
          });
        }
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};


module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedUser = await userModel.findOne({ email });

    if (!loggedUser) {
      return res.status(400).json({ message: "⚠️ User not found" });
    }

    bcrypt.compare(password, loggedUser.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (result) {
        const token = generateToken(loggedUser._id);

        // Optional: Save token in cookie
        res.cookie('token', token, { httpOnly: true });

        // ✅ Send token and user in response
        return res.status(200).json({
          message: "✅ Logged in successfully",
          token,
          user: {
            _id: loggedUser._id,
            fullname: loggedUser.fullname,
            email: loggedUser.email,
            // any other field you want to expose
          }
        });
      } else {
        return res.status(401).json({ message: "❌ Incorrect password" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

module.exports.getUserinfo = async (req, res) => {
    try {
        const userInfo = req.user;
        res.json(userInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(`Error : ${error.message}`);
    }
};
module.exports.logoutUser = async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.status(200).send('LoggedOut Successfully')
};
module.exports.uploadPic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`; // 👈 construct full image URL

    if (req.user) {
      req.user.profileImageUrl = imageUrl;
      await req.user.save(); // 👈 save image URL in user document
    }

    res.status(200).json({ imageUrl }); // 👈 send back usable image URL
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: 'Image upload failed.' });
  }
};

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ error: 'No token provided in Authorization header' });
    }
    const token = authHeader.split(' ')[1];

    const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(403).json({ error: 'Invalid token' });
  }
};