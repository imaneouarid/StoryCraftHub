// controllers/UserController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel.js');
const validator = require('validator');

require('dotenv').config();
const Key = process.env.SECRET_TOKEN



const UserController = {
    register: async (req, res) => {
        try {
            // Log the entire req.body object to inspect its structure
            console.log('Request Body:', req.body);
    
            // Destructure username, email, and password from req.body
            const { username, email, password } = req.body;
    
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }
    
            // Validate password strength
            if (!validator.isStrongPassword(password)) {
                return res.status(400).json({ error: 'Password is too weak' });
            }
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new user
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
                role: 'user',
            });
    
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

  login: async (req, res) => {
    try {
        console.log('Request Body:', req.body);

      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
    // Login route
const accessToken = jwt.sign({ email: user.email, userId: user._id }, Key, {
    expiresIn: '14h',
  });
  console.log('Access Token:', accessToken);

  // Corrected cookie key
  res.cookie("access_token", accessToken, { maxAge: 90000, httpOnly: true });
  

      console.log('User:', user); // Log the user object
    console.log('Access Token:', accessToken); 

    const username = user.username ;

    //   return res.json({ accessToken, id: user._id });
    return res.status(200).json({ message: 'Login successful', accessToken, id: user._id , username});

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.params.userId;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: req.body },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = UserController;
