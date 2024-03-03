// models/storyModel.js
import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }], // Reference to the Topic model
  createdDate: { type: Date, default: Date.now },
});

const Story = mongoose.model('Story', storySchema);

export default Story;