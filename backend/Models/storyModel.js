// models/storyModel.js
const mongoose = require('mongoose') ;

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, 
  isAnonymous: { type: Boolean,  default : false }, 

  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  topics: [{type: String , required : false}  ], 
  createdDate: { type: Date, default: Date.now },
});

const Story = mongoose.model('Story', storySchema);

module.exports =Story;