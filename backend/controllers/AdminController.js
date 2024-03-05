// controllers/AdminController.js
const User = require('../Models/userModel.js');

const AdminController = {
  // Method to get a list of all users (for admin only)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}, '-password'); // Exclude password field
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Method to update user information (for admin only)
  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { username, email, role } = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email, role },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Method to delete a user (for admin only)
  deleteUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = AdminController;
