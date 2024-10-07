const express = require('express');
const mongoose = require('mongoose');
const WaterLevel = require('./models/WaterLevelModel'); // Import the water level model
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
require("dotenv").config(); // Ensure this line is present
const dbConfig = require("./config/dbConfig.js");

// app.get('/api/insert', async (req, res) => {
//     try {
//         // Check if the document already exists, update if it does, insert new if it doesn't
//         let waterLevelData = await WaterLevel.findOne();

//         if (!waterLevelData) {
//             // If no document exists, insert a new one
//             const newWaterLevelData = new WaterLevel(data);
//             await newWaterLevelData.save();
//             return res.json({ message: "Data inserted successfully" });
//         } else {
//             // If document already exists, update the data (you can modify this logic as per your need)
//             await WaterLevel.updateOne({}, data);
//             return res.json({ message: "Data updated successfully" });
//         }
//     } catch (err) {
//         console.error('Error inserting data:', err);
//         res.status(500).json({ message: 'Error inserting data' });
//     }
// });
app.post('/api/signup', async (req, res) => {
    const { fullname, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const newUser = new User({
        fullname,
        email,
        password,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      if (user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  

app.get('/api/water-level', async (req, res) => {
    const { district, blockName, villageName } = req.query;

    try {
        // Find the document containing the TN array
        const waterDataDoc = await WaterLevel.findOne(); // Get the first document

        if (!waterDataDoc) {
            return res.status(404).json({ message: 'No water level data found' });
        }

        // Filter the TN array to find the matching entry
        const waterData = waterDataDoc.TN.find(entry =>
            entry.DISTRICT === district &&
            entry.BLOCK_NAME === blockName &&
            entry.VILLAGE_NAME === villageName
        );

        if (waterData) {
            res.json(waterData);  // Return the found water data
        } else {
            res.status(404).json({ message: 'Water level data not found' });
        }
    } catch (err) {
        console.error('Error fetching water level:', err);
        res.status(500).json({ message: 'Error fetching water level' });
    }





});


// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});