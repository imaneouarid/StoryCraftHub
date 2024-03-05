// routes/storyRoutes.js
const express = require('express');
const StoryController = require('../controllers/StoryController.js');

const router = express.Router();

router.post('/create', StoryController.createStory);
router.get('/:storyId', StoryController.getStoryById);

module.exports = router;
