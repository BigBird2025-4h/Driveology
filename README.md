# Driveology

<img width="200" height="440" alt="IMG_1813" src="https://github.com/user-attachments/assets/d5422c5e-bd31-4f2d-9671-2b54a66b9795" />
<img width="200" height="440" alt="IMG_1816" src="https://github.com/user-attachments/assets/f7b391ca-59a4-4b54-9cef-377254f1d32c" />
<img width="200" height="440" alt="IMG_1812" src="https://github.com/user-attachments/assets/0af8f7a4-e7c0-4a94-b204-b9de36f8c10e" />
<img width="200" height="440" alt="IMG_1819" src="https://github.com/user-attachments/assets/b3abfa6c-a3d9-4c72-8b9c-fcb7bfa5d533" />
<img width="200" height="440" alt="IMG_1824" src="https://github.com/user-attachments/assets/d5a1311e-39cf-45b3-8996-bab0e800fe1b" />



Driveology is a mobile driver-feedback application built with React Native and Expo. The app monitors driving behavior in real time using on-device sensors and GPS data, then provides a driving score, trip statistics, and personalized feedback after each drive.

The goal of Driveology is to help new drivers develop safer driving habits by providing immediate, easy-to-understand feedback without requiring external hardware, paid APIs, or vehicle integrations.

---

## Features

### Real-Time Driving Metrics
- Current speed (MPH)
- Distance traveled
- Trip duration
- Average speed
- Maximum speed

### Driving Behavior Analysis
- Hard brake detection using accelerometer data
- Phone usage detection using gyroscope data
- Speeding detection using GPS speed and road speed limits
- Overall driving score

### Speed Limit Detection
- Uses GPS coordinates to determine the current road
- Retrieves speed limit information from OpenStreetMap via Overpass API
- Includes fallback speed limits when road data is unavailable
- Local caching to reduce API requests

### Trip History
- Stores trips locally on the device
- View previous drives
- Review trip statistics
- Track progress over time

### Driver Coaching
- Generates feedback based on trip performance
- Highlights areas for improvement
- Encourages safer driving habits

### Progression System
- Earn XP for good driving
- Level up through consistent safe driving

---

# Stuff i used

- React Native
- Expo
- JavaScript
- Expo Location
- Expo Sensors
- AsyncStorage
- React Navigation
- React Native Maps
- OpenStreetMap
- Overpass API

---

# Requirements

Before starting, install:

### Node.js

Download:

https://nodejs.org

Verify installation:

```bash
node -v
npm -v
```

### Expo Go

Install Expo Go on your mobile device:

---

# Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/Driveology.git
```

Enter the project directory:

```bash
cd Driveology
```

Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

---

# Running the App

Start the Expo development server:

```bash
npx expo start
```

A QR code will appear in the terminal and browser.

### iPhone

1. Open the Camera app
2. Scan the QR code
3. Open in Expo Go

### Android

1. Open Expo Go
2. Tap "Scan QR Code"
3. Scan the QR code

The app should launch automatically.

---

# Permissions

Driveology requires the following permissions:

### Location

Used for:

- Speed calculation
- Route tracking
- Distance calculation
- Speed limit detection

### Motion Sensors

Used for:

- Hard brake detection
- Phone usage detection

Grant permissions when prompted.

---

# Project Structure

```text
Driveology
│
├── assets/
│
├── components/
│   ├── XPBar.js
│   ├── LevelBadge.js
│   └── ...
│
├── screens/
│   ├── DriveScreen.js
│   ├── HistoryScreen.js
│   ├── HomeScreen.js
│   └── ...
│
├── utils/
│   ├── Coach.js
│   ├── Storage.js
│   ├── TripModel.js
│   ├── XPSystem.js
│   └── SpeedLimitService.js
│
├── App.js
│
└── package.json
```

---

# Speed Limit Data

Driveology retrieves road speed limits using OpenStreetMap road data through the Overpass API.

Information retrieved may vary depending on:

- Road coverage in OpenStreetMap
- GPS accuracy
- Internet availability

When road speed limit data is unavailable, Driveology uses fallback values to continue operation.

---

# Data Storage

All trip data is stored locally on the device.

Stored information includes:

- Route coordinates
- Average speed
- Maximum speed
- Distance traveled
- Trip duration
- Driving score
- Hard brake events
- Phone usage events
- Speeding events

No trip data is uploaded to external servers.

---

# Development Notes

Driveology was developed as a Beta Club National Convention Invention project.

The application was designed around three goals:

1. Provide immediate driving feedback
2. Operate using only smartphone sensors
3. Avoid dependence on paid APIs or specialized hardware

---

# Known Limitations

- GPS accuracy varies by device
- Speed limit data depends on OpenStreetMap coverage
- Tunnel and underground driving may reduce location accuracy
- Speeding detection is dependent on GPS accuracy and available road data
- The app is intended for educational and driver-feedback purposes only

---

# Future Improvements

Potential future additions include:

- Improved route visualization
- Enhanced speed limit accuracy
- Driver trend analysis
- Cloud backup support
- Comparative driving analytics
- Expanded reward and achievement systems

---

# License

This project is provided for educational purposes.

---

# Authors

Noah H. A.K.A. The Certified Chud

Created for Beta Club National Convention Invention Competition.
