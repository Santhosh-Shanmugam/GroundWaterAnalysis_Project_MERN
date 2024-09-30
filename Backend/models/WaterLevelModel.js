const mongoose = require('mongoose');

// Define the schema for individual water level entries
const waterLevelEntrySchema = new mongoose.Schema({
    STATE: { type: String, required: true },
    DISTRICT: { type: String, required: true },
    BLOCK_NAME: { type: String, required: true },
    VILLAGE_NAME: { type: String, required: true },
    SITE_NAME: { type: String, required: true },
    LATITUDE: { type: Number, required: true },
    LONGITUDE: { type: Number, required: true },
    WELL_SITE_TYPE: { type: String, required: true },
    WATER_LEVEL: { type: Number, required: true }
}, { _id: false }); // Disable automatic _id generation for entries

// Define the main schema that contains an array for the state (e.g., TN)
const stateWaterLevelSchema = new mongoose.Schema({
    TN: [waterLevelEntrySchema]  // Array of water level entries
});

// Export the model
module.exports = mongoose.model('WaterLevel', stateWaterLevelSchema);
