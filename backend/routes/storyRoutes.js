// routes/storyRoutes.js
const express = require('express');
const StoryController = require('../controllers/StoryController.js');

const router = express.Router();

router.post('/create', StoryController.createStory);
router.get('/user/:userId',  StoryController.getUserStories); 
router.get('/:storyId', StoryController.getStoryById);
router.get('/', StoryController.getAllStories); 

module.exports = router;
