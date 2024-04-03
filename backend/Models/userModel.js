// models/userModel.js
const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: 'No bio created' },
  image: { type: String, default: 'default-profile-image.jpg' }, 
  joinDate: { type: Date, default: Date.now },
  interests: [{ type: String }], 
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
