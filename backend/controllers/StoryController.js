// controllers/StoryController.js
const Story = require('../Models/storyModel.js');
const mongoose = require('mongoose') ;


const StoryController = {
  createStory: async (req, res) => {
    let { title, content, topics,author, isAnonymous } = req.body;
    console.log("User ID:", author);


    try {
      if (!(author && mongoose.Types.ObjectId.isValid(author))) {
        author = null;
            } 

      // Create the story
      const story = new Story({
        title,
        content,
        topics,
        isAnonymous,
        author, // Set author to the valid ObjectId or null
        createdDate: new Date()
      });

      // Save the story
      const savedStory = await story.save();
      console.log('Story saved successfully:', savedStory);
      res.status(200).json(savedStory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getStoryById: async (req, res) => {
    try {
      const story = await Story.findById(req.params.storyId);
      if (!story) {
        return res.status(404).json({ error: 'Story not found' });
      }
      res.status(200).json(story);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getAllStories: async (req, res) => {
    try {
      const stories = await Story.find().populate('author');
      console.log(stories);
      res.status(200).json(stories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getStoriesByTopic: async (req, res) => {
    const { topicId } = req.params;
    try {
      // Retrieve stories based on the provided topicId
      const stories = await Story.find({ topic: topicId });
      res.status(200).json(stories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  



};
exports.getUserStories = async (req, res) => {
  try {
    const userId = req.user.id; 
    const stories = await Story.find({ user: userId });

    res.status(200).json({ stories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

StoryController.getUserStories = async (req, res) => {
  try {
    // Fetch stories from the database based on the current user's ID
    const userId = req.user.id; 
    const stories = await Story.find({ user: userId });

    res.status(200).json({ stories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = StoryController;
