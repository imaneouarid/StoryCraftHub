// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Not connected to the database " + err);
  });



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
