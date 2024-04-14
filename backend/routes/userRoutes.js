// routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/UserController.js') ;
const validateToken = require("../Middlewares/tokenValidation")

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:userId', UserController.getUserProfile);
router.put('/:userId', UserController.updateProfile);

module.exports = router;
