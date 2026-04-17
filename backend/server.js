const express = require("express");
const cors = require("cors");
const predictYield = require("./ailogic");

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Server running" });
});

// Prediction endpoint with enhanced error handling
app.post("/predict", (req, res) => {
  try {
    const { rainfall, temperature, soil, ph_level, nitrogen_level, crop } = req.body;

    // Validate required fields
    if (!rainfall || !temperature || !soil) {
      return res.status(400).json({
        error: "Missing required fields: rainfall, temperature, soil"
      });
    }

    // Validate data types and ranges
    const rain = parseFloat(rainfall);
    const temp = parseFloat(temperature);
    const phLevel = parseFloat(ph_level) || 6.5;
    const nitrogenLevel = parseFloat(nitrogen_level) || 50;
    const selectedCrop = crop || 'wheat';

    if (isNaN(rain) || isNaN(temp)) {
      return res.status(400).json({
        error: "Rainfall and temperature must be valid numbers"
      });
    }

    if (temp < -50 || temp > 50) {
      return res.status(400).json({
        error: "Temperature must be between -50 and 50°C"
      });
    }

    if (rain < 0) {
      return res.status(400).json({
        error: "Rainfall cannot be negative"
      });
    }

    const result = predictYield(rain, temp, soil, phLevel, nitrogenLevel, selectedCrop);
    
    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
