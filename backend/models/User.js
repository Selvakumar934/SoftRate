const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please provide your name'], trim: true, maxlength: 70 },
    email: { type: String, required: [true, 'Please provide an email'], unique: true, lowercase: true, trim: true },
    password: { type: String, required: [true, 'Please provide a password'], minlength: 6, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    accountStatus: { type: String, enum: ['active', 'deactivated'], default: 'active' },
    bio: { type: String, maxlength: 300, default: '' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    websiteUrl: { type: String, default: '' },
    socialMediaId: { type: String, default: '' }
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);