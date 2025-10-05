const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists and is properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided in Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    // Debugging logs
    console.log("🔐 Auth Header:", authHeader);
    console.log("🧾 Token:", token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);

    // Find the user in the DB
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    console.log("👤 User found:", user.email || user._id); // optional user info log

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { isLoggedIn };
