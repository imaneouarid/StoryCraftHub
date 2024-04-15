// server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require ('./routes/userRoutes.js');
const storyRoutes = require('./routes/storyRoutes.js');


const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();
require('dotenv').config();

app.use(express.json());


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(cookieParser())

// app.use(authMiddleware); 
const PORT = process.env.PORT 
app.use('/users', userRoutes);
app.use('/stories', storyRoutes);


// app.get('/users/interests/:username', async (req, res) => {
//     const { username } = req.params;
  
//     try {
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       const userInterests = user.interests;
//       res.status(200).json(userInterests);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });




// Connect to MongoDB
mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Connected to the database hh");
  })
  .catch((err) => {
    console.log("Not connected to the database " + err);
  });



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});