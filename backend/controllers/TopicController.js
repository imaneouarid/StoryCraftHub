const Topic = require('../Models/topicModel.js');
const User = require('../Models/userModel.js');

const TopicController = {
    getAllTopics: async (req, res) => {
      try {
        const topics = await Topic.find();
        res.status(200).json(topics);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    updateUserInterests: async (req, res) => {
      try {
        const { username, interests } = req.body;
  
        // Assuming you have a User model
        // Replace 'User' with your actual user model
        const user = await User.findOneAndUpdate(
          { username },
          { interests },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.status(200).json({ message: 'Interests updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  };
  
  module.exports = TopicController;
