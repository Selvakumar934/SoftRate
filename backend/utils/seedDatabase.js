require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.js');
const Category = require('../models/Category.js');
const Article = require('../models/Article.js');
const mockStore = require('./mockStore.js');

const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/devsphere';
    await mongoose.connect(uri);
    console.log('[Seed] Connected to MongoDB at', uri);

    const usersMap = {};
    for (const u of mockStore.users) {
      let existing = await User.findOne({ email: u.email });
      if (!existing) {
        existing = await User.create({
          name: u.name,
          email: u.email,
          password: u.role === 'admin' ? (process.env.INITIAL_ADMIN_PASSWORD || 'AdminPass2026!') : 'UserPass2026!',
          role: u.role,
          accountStatus: 'active'
        });
      }
      usersMap[u.email] = existing._id;
    }

    let cat = await Category.findOne({ slug: 'software-development' });
    if (!cat) {
      cat = await Category.create({
        name: 'Software Development',
        slug: 'software-development',
        description: 'Practical tutorials, clean code patterns, system architecture, and software engineering.',
        articleCount: 18
      });
    }

    for (const a of mockStore.articles) {
      await Article.findOneAndUpdate(
        { slug: a.slug },
        {
          title: a.title,
          slug: a.slug,
          shortDescription: a.shortDescription,
          domain: a.domain || 'Software Development',
          fullContent: a.fullContent,
          featuredImage: a.featuredImage,
          categoryId: cat._id,
          authorId: usersMap[a.authorId?.email] || usersMap['admin@devsphere.com'],
          status: a.status,
          featuredStatus: Boolean(a.featuredStatus),
          publishedDate: a.publishedDate,
          readingTimeMinutes: a.readingTimeMinutes || 5,
          viewsCount: a.viewsCount || 1000
        },
        { upsert: true, returnDocument: 'after' }
      );
    }

    console.log(`[Seed] Database successfully populated with ${mockStore.articles.length} articles!`);
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err.message);
    process.exit(1);
  }
};

seed();