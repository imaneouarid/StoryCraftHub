// routes/topicRoutes.js
const express = require('express');
const TopicController = require('../controllers/TopicController.js');

const router = express.Router();

router.get('/', TopicController.getAllTopics);
router.put('/update-interests', TopicController.updateUserInterests);

module.exports = router;
