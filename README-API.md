# PiCollector API Documentation

## Overview
The PiCollector API serves as the backend for the PiCollector platform, facilitating data collection, session management, and device configuration. Currently, the API provides mock data for frontend development and testing purposes. 

---

## Base URL
For local development: `http://localhost:5000`

---

## Endpoints

### 1. `/health`
- **Method:** GET
- **Description:** Checks if the API is running and healthy.
- **Response:**
  ```json
  {
    "status": "ok"
  }
  ```

---

### 2. `/api/collect-data`
- **Method:** GET
- **Description:** Simulates live data collection by returning mock images and gyroscope data.
- **Response:**
  ```json
  {
    "images": [
      "http://localhost:5000/static/temp_image_1.jpg",
      "http://localhost:5000/static/temp_image_2.jpg"
    ],
    "gyro_data": [
      { "timestamp": 123456789, "angle": 30 },
      { "timestamp": 123456790, "angle": 31 }
    ]
  }
  ```

---

### 3. `/api/review-data`
- **Method:** GET
- **Description:** Retrieves a list of mock data collection sessions.
- **Response:**
  ```json
  [
    { "id": "session1", "name": "Test Session 1", "date": "2024-11-16" },
    { "id": "session2", "name": "Test Session 2", "date": "2024-11-15" }
  ]
  ```

---

### 4. `/api/session/<id>`
- **Method:** GET
- **Description:** Retrieves details for a specific session, including images and gyroscope data.
- **Path Parameter:**
  - `id`: The session ID (e.g., `session1`).
- **Response:**
  ```json
  {
    "id": "session1",
    "name": "Test Session 1",
    "images": [
      "http://localhost:5000/static/session1_image_1.jpg",
      "http://localhost:5000/static/session1_image_2.jpg"
    ],
    "gyro_data": [
      { "timestamp": 123456789, "angle": 30 },
      { "timestamp": 123456790, "angle": 31 }
    ]
  }
  ```

---

### 5. `/api/settings`
- **Method:** GET
- **Description:** Returns mock configuration data for connected cameras and gyroscope devices.
- **Response:**
  ```json
  {
    "cameras": [
      { "id": "camera1", "name": "Left Camera", "resolution": "1920x1080" },
      { "id": "camera2", "name": "Right Camera", "resolution": "1920x1080" }
    ],
    "gyro": { "connected": true, "device_name": "iPhone Gyro" }
  }
  ```

---

## Notes
- **Mock Data:** All endpoints currently return placeholder data to simulate real functionality.
- **Health Check:** Use the `/health` endpoint to confirm the API is running before making other requests.
- **Future Development:** The mock responses will be replaced with real functionality as development progresses.

---

## Example Usage
### Testing with `curl`
1. **Check API Health:**
   ```bash
   curl http://localhost:5000/health
   ```
2. **Fetch Mock Data:**
   ```bash
   curl http://localhost:5000/api/collect-data
   ```
3. **Retrieve Session List:**
   ```bash
   curl http://localhost:5000/api/review-data
   ```
4. **Get Specific Session Details:**
   ```bash
   curl http://localhost:5000/api/session/session1
   ```

---

## Development Notes
- **Dependencies:** Flask, Flask-CORS
- **Folder Structure:**
  ```
  api/
  ├── app.py
  ├── temp_data/
  │   ├── temp_image_1.jpg
  │   ├── temp_image_2.jpg
  ├── mock_data.py
  ```

This file will evolve as the API is developed further to include real functionality.