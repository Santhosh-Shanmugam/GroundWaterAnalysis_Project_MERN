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