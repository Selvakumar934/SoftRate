const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    process.env.JWT_SECRET || 'devsphere_super_secret_jwt_key_2026_secure_xyz_987',
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
