const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User.js');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsphere_super_secret_jwt_key_2026_secure_xyz_987');

    // If MongoDB is connected and not a dev ID
    if (mongoose.connection.readyState === 1 && !decoded.id.startsWith('admin-dev')) {
      try {
        const user = await User.findById(decoded.id).select('-password');
        if (user) {
          if (user.accountStatus !== 'active') {
            return res.status(403).json({ success: false, message: 'Access denied: Account has been deactivated.' });
          }
          req.user = user;
          return next();
        }
      } catch (err) {
        // Fall through to decoded token
      }
    }

    // Attach user from decoded JWT token
    req.user = {
      _id: decoded.id,
      id: decoded.id,
      name: decoded.name || 'User',
      email: decoded.email,
      role: decoded.role || 'user',
      accountStatus: 'active'
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Session expired or token invalid.' });
  }
};

module.exports = authenticateToken;
