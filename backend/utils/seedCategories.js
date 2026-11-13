require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category.js');

const categories = [
  {
    name: 'Software Development',
    slug: 'software-development',
    description: 'Practical tutorials, clean code patterns, system architecture, and software engineering best practices.'
  }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[Seed] Connected to MongoDB Atlas...');
    // Clear and ensure only Software Development is seeded
    await Category.deleteMany();
    for (const cat of categories) {
      await Category.create(cat);
      console.log(`[Seed] Seeded category: ${cat.name}`);
    }
    console.log('[Seed] Category seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Categories Error]:', error.message);
    process.exit(1);
  }
};

seedCategories();
