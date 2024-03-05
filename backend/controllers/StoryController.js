// controllers/StoryController.js
const Story = require('../Models/storyModel.js');

const StoryController = {
  createStory: async (req, res) => {
    try {
      // Implement the logic to create a new story
      // Make sure to associate the story with the user and topics
      // For simplicity, let's assume user and topics information are available in req.body

      const newStory = await Story.create(req.body);
      res.status(201).json(newStory);
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
};

module.exports = StoryController;
