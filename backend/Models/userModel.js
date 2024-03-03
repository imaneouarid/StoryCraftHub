// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: 'No bio created' },
  image: { type: String, default: 'default-profile-image.jpg' }, // Assuming you store images' paths
  joinDate: { type: Date, default: Date.now },
  interests: [{ type: String }],
});

const User = mongoose.model('User', userSchema);

export default User;
