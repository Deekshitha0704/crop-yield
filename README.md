# Crop Yield Prediction Application

An advanced AI-powered crop yield prediction system built with Angular (frontend) and Node.js/Express (backend).

## Features

### 🤖 AI Tool Enhancements
- **Advanced ML Model**: Multi-factor prediction algorithm analyzing 5 key parameters
  - Rainfall (optimal: 700-1200mm)
  - Temperature (optimal: 20-30°C)
  - Soil Type (loam, clay, sandy, silt, peat)
  - pH Level (optimal: 6.0-7.0)
  - Nitrogen Level (optimal: 40-60 kg/ha)

- **Confidence Scoring**: Model returns prediction confidence levels based on input consistency
- **Detailed Factor Analysis**: Individual scoring for each environmental factor
- **Error Handling**: Robust validation of inputs with meaningful error messages

### 🌐 Web Development Features
- **Modern Angular 16+ Standalone Components**: Built with latest Angular conventions
- **Responsive Design**: Mobile-friendly interface with adaptive layout
- **Real-time Predictions**: HTTP service integration with Express backend
- **Visual Analytics**: Progress bars and color-coded results (high/medium/low yield)
- **Form Validation**: Client-side validation with error feedback
- **Loading States**: User feedback during API calls
- **RESTful API**: Clean API endpoints with proper HTTP status codes

## Project Structure

```
crop yield/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── ailogic.js         # ML prediction algorithm
│   └── package.json       # Backend dependencies
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── app.config.ts      # Angular configuration
    │   │   ├── app.routes.ts      # Route definitions
    │   │   ├── app.ts            # Root component
    │   │   ├── predict/
    │   │   │   ├── predict.ts     # Prediction component
    │   │   │   ├── predict.html   # Template
    │   │   │   └── predict.less   # Styles
    │   │   └── services/
    │   │       └── crop-prediction.service.ts  # API service
    │   ├── main.ts
    │   └── index.html
    ├── package.json
    └── angular.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI

### Backend Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start the backend server:
```bash
node server.js
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:4200`

## API Endpoints

### POST /predict
**Description**: Get crop yield prediction based on environmental factors

**Request Body**:
```json
{
  "rainfall": 800,
  "temperature": 25,
  "soil": "loam",
  "ph_level": 6.5,
  "nitrogen_level": 50
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "prediction": "HIGH yield",
    "score": 88,
    "confidence": 92,
    "details": {
      "rainfallScore": 100,
      "tempScore": 100,
      "soilScore": 100,
      "phScore": 100,
      "nitrogenScore": 80
    }
  }
}
```

### GET /health
**Description**: Health check endpoint

**Response**:
```json
{
  "status": "Server running"
}
```

## Usage

1. Enter farm conditions:
   - Rainfall (mm) - Required
   - Temperature (°C) - Required
   - Soil Type - Required (dropdown)
   - pH Level - Optional (defaults to 6.5)
   - Nitrogen Level - Optional (defaults to 50 kg/ha)

2. Click "Predict Yield" button

3. View results:
   - Yield level prediction (HIGH/MEDIUM/LOW/VERY LOW)
   - Overall prediction score (0-100)
   - Model confidence percentage
   - Individual factor analysis

## Technical Stack

### Frontend
- **Framework**: Angular 16+
- **Language**: TypeScript
- **Styling**: LESS
- **HTTP Client**: Angular HttpClient
- **State Management**: Angular Signals

### Backend
- **Framework**: Express.js
- **Language**: JavaScript (Node.js)
- **CORS**: Enabled for frontend communication

## Prediction Model Details

The AI model uses a weighted scoring system:
- Rainfall: 25% weight
- Temperature: 25% weight
- Soil Quality: 25% weight
- pH Level: 15% weight
- Nitrogen Level: 10% weight

### Yield Classifications
- **HIGH yield**: Score ≥ 85
- **MEDIUM yield**: Score ≥ 65
- **LOW yield**: Score ≥ 45
- **VERY LOW yield**: Score < 45

## Future Enhancements

- [ ] Historical data tracking
- [ ] Weather API integration
- [ ] Multi-crop support
- [ ] Machine learning model deployment (TensorFlow)
- [ ] User authentication
- [ ] Data persistence (MongoDB)
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)

## Error Handling

The application includes comprehensive error handling:
- Input validation on both client and server
- Meaningful error messages
- Graceful error display in UI
- Server-side exception handling

## Development

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

### Running Tests

```bash
cd frontend
npm test
```

## License

ISC

## Support

For issues or questions, please contact the development team.
