// routes/storyRoutes.js
const express = require('express');
const StoryController = require('../controllers/StoryController.js');

const router = express.Router();

router.post('/create', StoryController.createStory);
router.get('/:storyId', StoryController.getStoryById);
router.get('/', StoryController.getAllStories); // Route to get all stories
router.get('/topics/:topicId', StoryController.getStoriesByTopic); // Route to get stories by topic
router.get('/my_stories',  StoryController.getUserStories);



module.exports = router;
