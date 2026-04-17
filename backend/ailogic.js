// Crop specifications with optimal conditions
const CROP_SPECS = {
  rice: {
    rainfall: { min: 1000, max: 1500, optimal: 1200 },
    temperature: { min: 20, max: 30, optimal: 25 },
    soil: ['loam', 'clay'],
    ph: { min: 5.5, max: 7.5, optimal: 6.5 },
    nitrogen: { min: 80, max: 120, optimal: 100 }
  },
  wheat: {
    rainfall: { min: 400, max: 900, optimal: 600 },
    temperature: { min: 15, max: 25, optimal: 20 },
    soil: ['loam', 'sandy'],
    ph: { min: 6.0, max: 7.5, optimal: 6.5 },
    nitrogen: { min: 40, max: 80, optimal: 60 }
  },
  corn: {
    rainfall: { min: 500, max: 1000, optimal: 750 },
    temperature: { min: 18, max: 28, optimal: 23 },
    soil: ['loam'],
    ph: { min: 6.0, max: 7.5, optimal: 6.8 },
    nitrogen: { min: 60, max: 120, optimal: 90 }
  },
  sugarcane: {
    rainfall: { min: 1200, max: 2000, optimal: 1600 },
    temperature: { min: 21, max: 32, optimal: 27 },
    soil: ['loam', 'clay'],
    ph: { min: 6.0, max: 8.0, optimal: 6.8 },
    nitrogen: { min: 100, max: 150, optimal: 120 }
  }
};

// Advanced Crop Yield Prediction Model with Multi-Crop Support
function predictYield(rain, temp, soil, phLevel = 6.5, nitrogenLevel = 50, crop = 'wheat') {
  // Input validation
  if (!rain || !temp || !soil) {
    throw new Error("Missing required parameters: rainfall, temperature, soil");
  }

  if (rain < 0 || temp < -50 || temp > 50) {
    throw new Error("Invalid environmental parameters");
  }

  // Validate crop
  if (!CROP_SPECS[crop]) {
    throw new Error(`Unsupported crop: ${crop}. Supported: rice, wheat, corn, sugarcane`);
  }

  // Get crop-specific weights and parameters
  const cropSpec = CROP_SPECS[crop];
  const weights = getCropWeights(crop);

  // Calculate scores with crop-specific optimal ranges
  let rainfallScore = calculateCropRainfallScore(rain, cropSpec.rainfall);
  let tempScore = calculateCropTempScore(temp, cropSpec.temperature);
  let soilScore = calculateCropSoilScore(soil, cropSpec.soil);
  let phScore = calculateCropPhScore(phLevel, cropSpec.ph);
  let nitrogenScore = calculateCropNitrogenScore(nitrogenLevel, cropSpec.nitrogen);

  // Calculate weighted total
  let score = 
    (rainfallScore * weights.rainfall) +
    (tempScore * weights.temperature) +
    (soilScore * weights.soil) +
    (phScore * weights.ph) +
    (nitrogenScore * weights.nitrogen);

  // Generate recommendations
  let recommendations = generateRecommendations(rain, temp, soil, phLevel, nitrogenLevel, crop);
  
  // Generate alerts
  let alerts = generateAlerts(rain, temp, soil, phLevel, nitrogenLevel, crop);

  // Determine yield level and confidence
  let yieldLevel = determineYieldLevel(score);
  let confidence = calculateConfidence(score, rainfallScore, tempScore, soilScore);

  return {
    crop,
    prediction: yieldLevel,
    score: Math.round(score),
    confidence: Math.round(confidence),
    recommendations,
    alerts,
    details: {
      rainfallScore,
      tempScore,
      soilScore,
      phScore,
      nitrogenScore
    }
  };
}

function getCropWeights(crop) {
  const weights = {
    rice: { rainfall: 0.35, temperature: 0.20, soil: 0.20, ph: 0.15, nitrogen: 0.10 },
    wheat: { rainfall: 0.30, temperature: 0.25, soil: 0.20, ph: 0.15, nitrogen: 0.10 },
    corn: { rainfall: 0.25, temperature: 0.25, soil: 0.25, ph: 0.15, nitrogen: 0.10 },
    sugarcane: { rainfall: 0.30, temperature: 0.25, soil: 0.20, ph: 0.15, nitrogen: 0.10 }
  };
  return weights[crop] || weights.wheat;
}

function calculateCropRainfallScore(rainfall, optimalRange) {
  const { min, max, optimal } = optimalRange;
  if (rainfall >= min && rainfall <= max) {
    const distance = Math.abs(rainfall - optimal);
    return Math.max(70, 100 - (distance / (max - min)) * 30);
  }
  if (rainfall < min) return Math.max(20, 40 - ((min - rainfall) / 200));
  return Math.max(20, 40 - ((rainfall - max) / 200));
}

function calculateCropTempScore(temp, optimalRange) {
  const { min, max, optimal } = optimalRange;
  if (temp >= min && temp <= max) {
    const distance = Math.abs(temp - optimal);
    return Math.max(70, 100 - (distance / (max - min)) * 30);
  }
  if (temp < min) return Math.max(20, 40 - ((min - temp) / 5));
  return Math.max(20, 40 - ((temp - max) / 5));
}

function calculateCropSoilScore(soil, preferredSoils) {
  if (preferredSoils.includes(soil?.toLowerCase())) return 100;
  
  const soilScores = {
    "loam": 90,
    "clay": 80,
    "sandy": 60,
    "silt": 85,
    "peat": 40
  };
  return soilScores[soil?.toLowerCase()] || 50;
}

function calculateCropPhScore(phLevel, optimalRange) {
  const { min, max, optimal } = optimalRange;
  if (phLevel >= min && phLevel <= max) {
    const distance = Math.abs(phLevel - optimal);
    return Math.max(70, 100 - (distance / (max - min)) * 30);
  }
  return Math.max(20, 50 - Math.abs(phLevel - optimal) * 5);
}

function calculateCropNitrogenScore(nitrogen, optimalRange) {
  const { min, max, optimal } = optimalRange;
  if (nitrogen >= min && nitrogen <= max) {
    const distance = Math.abs(nitrogen - optimal);
    return Math.max(70, 100 - (distance / (max - min)) * 30);
  }
  if (nitrogen < min) return Math.max(30, 50 - ((min - nitrogen) / 10));
  return Math.max(30, 50 - ((nitrogen - max) / 10));
}

function generateRecommendations(rain, temp, soil, phLevel, nitrogenLevel, crop) {
  const cropSpec = CROP_SPECS[crop];
  const recommendations = [];

  // Rainfall recommendations
  if (rain < cropSpec.rainfall.min) {
    recommendations.push({
      type: 'warning',
      factor: 'Rainfall',
      message: `Rainfall is below optimal (${cropSpec.rainfall.min}mm). Consider irrigation.`,
      importance: 'high'
    });
  } else if (rain > cropSpec.rainfall.max) {
    recommendations.push({
      type: 'warning',
      factor: 'Rainfall',
      message: `Rainfall is above optimal (${cropSpec.rainfall.max}mm). Ensure proper drainage.`,
      importance: 'medium'
    });
  }

  // Temperature recommendations
  if (temp < cropSpec.temperature.min) {
    recommendations.push({
      type: 'warning',
      factor: 'Temperature',
      message: `Temperature is below optimal (${cropSpec.temperature.min}°C). Wait for warmer weather.`,
      importance: 'high'
    });
  } else if (temp > cropSpec.temperature.max) {
    recommendations.push({
      type: 'warning',
      factor: 'Temperature',
      message: `Temperature is above optimal (${cropSpec.temperature.max}°C). Provide shade or cooling measures.`,
      importance: 'high'
    });
  } else {
    recommendations.push({
      type: 'success',
      factor: 'Temperature',
      message: `Temperature is optimal for ${crop}. Great conditions!`,
      importance: 'low'
    });
  }

  // Soil recommendations
  if (!cropSpec.soil.includes(soil?.toLowerCase())) {
    recommendations.push({
      type: 'warning',
      factor: 'Soil',
      message: `${soil} soil is not ideal for ${crop}. Consider soil amendments.`,
      importance: 'medium'
    });
  } else {
    recommendations.push({
      type: 'success',
      factor: 'Soil',
      message: `${soil} soil is excellent for ${crop}.`,
      importance: 'low'
    });
  }

  // pH recommendations
  if (phLevel < cropSpec.ph.min || phLevel > cropSpec.ph.max) {
    const adjustment = phLevel < cropSpec.ph.optimal ? 'increase' : 'decrease';
    recommendations.push({
      type: 'warning',
      factor: 'pH Level',
      message: `pH level is suboptimal. Consider using lime to ${adjustment} pH.`,
      importance: 'medium'
    });
  }

  // Nitrogen recommendations
  if (nitrogenLevel < cropSpec.nitrogen.optimal) {
    recommendations.push({
      type: 'warning',
      factor: 'Nitrogen',
      message: `Nitrogen levels are low. Consider applying nitrogen fertilizer.`,
      importance: 'high'
    });
  } else if (nitrogenLevel > cropSpec.nitrogen.max) {
    recommendations.push({
      type: 'warning',
      factor: 'Nitrogen',
      message: `Nitrogen levels are high. Reduce fertilizer application.`,
      importance: 'medium'
    });
  }

  return recommendations;
}

function generateAlerts(rain, temp, soil, phLevel, nitrogenLevel, crop) {
  const cropSpec = CROP_SPECS[crop];
  const alerts = [];

  // Critical temperature alerts
  if (temp < cropSpec.temperature.min - 5) {
    alerts.push({
      severity: 'critical',
      message: `⚠️ CRITICAL: Temperature is dangerously low for ${crop}!`
    });
  }
  if (temp > cropSpec.temperature.max + 5) {
    alerts.push({
      severity: 'critical',
      message: `⚠️ CRITICAL: Temperature is dangerously high for ${crop}!`
    });
  }

  // Critical rainfall alerts
  if (rain < cropSpec.rainfall.min * 0.5) {
    alerts.push({
      severity: 'critical',
      message: `⚠️ CRITICAL: Severe drought conditions detected!`
    });
  }
  if (rain > cropSpec.rainfall.max * 1.5) {
    alerts.push({
      severity: 'critical',
      message: `⚠️ CRITICAL: Severe flooding risk detected!`
    });
  }

  // pH critical alerts
  if (phLevel < 4 || phLevel > 9) {
    alerts.push({
      severity: 'critical',
      message: `⚠️ CRITICAL: pH level is unsuitable for any crop!`
    });
  }

  return alerts;
}

function calculateConfidence(score, ...individualScores) {
  // Confidence is based on consistency of individual factors
  const avg = score;
  const variance = individualScores.reduce((sum, s) => sum + Math.abs(s - avg), 0) / individualScores.length;
  return Math.max(40, 100 - (variance * 0.5));
}

function determineYieldLevel(score) {
  if (score >= 85) return "HIGH yield";
  if (score >= 65) return "MEDIUM yield";
  if (score >= 45) return "LOW yield";
  return "VERY LOW yield";
}

module.exports = predictYield;
