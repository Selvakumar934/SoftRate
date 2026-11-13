require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.js');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[Seed] Connected to MongoDB Atlas...');

    const email = process.env.INITIAL_ADMIN_EMAIL || 'admin@devsphere.com';
    const password = process.env.INITIAL_ADMIN_PASSWORD || 'AdminPass2026!';

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log(`[Seed] Admin already exists: ${email}`);
      process.exit(0);
    }

    const admin = new User({
      name: 'DevSphere Administrator',
      email,
      password,
      role: 'admin',
      accountStatus: 'active',
      bio: 'Platform Administrator for the DevSphere publication network.'
    });

    await admin.save();
    console.log(`[Seed] Admin user created successfully: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('[Seed Admin Error]:', error.message);
    process.exit(1);
  }
};

seedAdmin();
