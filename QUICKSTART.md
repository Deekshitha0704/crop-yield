# Quick Start Guide

## Getting Started

### 1. Start Backend Server

```bash
cd backend
npm install
node server.js
```

Expected output:
```
Backend running on port 5000
```

### 2. Start Frontend Development Server

In a new terminal:
```bash
cd frontend
npm install
npm start
```

The browser will automatically open to `http://localhost:4200`

### 3. Make a Prediction

1. Fill in the form with farm data:
   - **Rainfall**: 900 (mm)
   - **Temperature**: 25 (°C)
   - **Soil Type**: loam
   - **pH Level**: 6.5 (optional)
   - **Nitrogen Level**: 50 (optional)

2. Click "Predict Yield"

3. View the results with:
   - Prediction (HIGH/MEDIUM/LOW/VERY LOW)
   - Score (0-100)
   - Confidence (%)
   - Individual factor breakdown

## Test Data Examples

### High Yield Scenario
- Rainfall: 850 mm
- Temperature: 25°C
- Soil: loam
- pH: 6.7
- Nitrogen: 50 kg/ha

**Expected Result**: HIGH yield (85+)

### Medium Yield Scenario
- Rainfall: 600 mm
- Temperature: 22°C
- Soil: clay
- pH: 6.5
- Nitrogen: 40 kg/ha

**Expected Result**: MEDIUM yield (65-84)

### Low Yield Scenario
- Rainfall: 400 mm
- Temperature: 15°C
- Soil: sandy
- pH: 5.5
- Nitrogen: 30 kg/ha

**Expected Result**: LOW yield (45-64)

## Troubleshooting

### Backend not responding
- Ensure server.js is running on port 5000
- Check for port conflicts: `netstat -ano | findstr :5000` (Windows)
- Try different port by modifying `PORT` in server.js

### Frontend not connecting to backend
- Ensure backend is running first
- Check that API URL in `crop-prediction.service.ts` matches backend address
- Check browser console for CORS errors

### Port 4200 already in use
- Angular will automatically use next available port
- Or specify different port: `ng serve --port 4201`

## Development Tools

### View API requests
1. Open browser DevTools (F12)
2. Go to Network tab
3. Make a prediction
4. See POST request to `/predict`

### Check console for errors
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any error messages

## Environment Variables

### Backend (.env suggested)
```
PORT=5000
NODE_ENV=development
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

## Next Steps

1. **Enhance UI**: Add charts and visualizations
2. **Database Integration**: Store predictions in MongoDB
3. **ML Model**: Replace rule-based with TensorFlow model
4. **Authentication**: Add user login and history tracking
5. **Mobile App**: Create React Native mobile version
6. **Deployment**: Deploy to Azure/AWS/Heroku

## Useful Commands

```bash
# Backend
npm install            # Install dependencies
node server.js         # Start server
npm test              # Run tests (if configured)

# Frontend
npm install           # Install dependencies
npm start             # Start dev server
npm run build         # Build for production
npm test              # Run unit tests
npm run lint          # Run linter
```

## API Testing with cURL

```bash
# Test prediction endpoint
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "rainfall": 850,
    "temperature": 25,
    "soil": "loam",
    "ph_level": 6.5,
    "nitrogen_level": 50
  }'

# Test health check
curl http://localhost:5000/health
```

## Resources

- [Angular Documentation](https://angular.io)
- [Express Documentation](https://expressjs.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [HTTP Best Practices](https://restfulapi.net)

## Support

For issues or questions, refer to the main README.md file.
