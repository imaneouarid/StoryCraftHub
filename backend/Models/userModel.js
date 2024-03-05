// models/userModel.js
const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: 'No bio created' },
  image: { type: String, default: 'default-profile-image.jpg' }, // Assuming you store images' paths
  joinDate: { type: Date, default: Date.now },
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }], // Reference to topics
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
