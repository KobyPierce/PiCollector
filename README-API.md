# PiCollector API Documentation

## Overview
The PiCollector API serves as the backend for the PiCollector platform, enabling live data collection, session management, and device configuration. Recent updates include the integration of QR code-based steering angle tracking and cumulative rotation data, along with responsive endpoints for synchronized operation with the frontend.

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
- **Description:** Returns live data, including cumulative rotation (from the QR code tracking) and mock images for testing.
- **Response:**
  ```json
  {
    "images": [
      "http://localhost:5000/static/temp_image_1.jpg",
      "http://localhost:5000/static/temp_image_2.jpg"
    ],
    "cumulative_rotation": 45.75
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
- **Description:** Retrieves details for a specific session, including collected images and cumulative rotation data.
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
    "cumulative_rotation": [
      { "timestamp": 123456789, "value": 30.5 },
      { "timestamp": 123456790, "value": 31.0 }
    ]
  }
  ```

---

### 5. `/api/settings`
- **Method:** GET
- **Description:** Returns mock configuration data for connected cameras and cumulative rotation tracking devices.
- **Response:**
  ```json
  {
    "cameras": [
      { "id": "camera1", "name": "Left Camera", "resolution": "1920x1080" },
      { "id": "camera2", "name": "Right Camera", "resolution": "1920x1080" }
    ],
    "tracking_device": { "connected": true, "device_name": "QR Code Tracker" }
  }
  ```

---

## Notes
- **Live Data:** The API now tracks cumulative rotation from the QR code tracking feature and sends this data to the frontend in real time.
- **Health Check:** Use the `/health` endpoint to confirm the API is running before making other requests.
- **Future Development:** The mock responses will be replaced with real data as integration with Raspberry Pi hardware progresses.

---

## Example Usage
### Testing with `curl`
1. **Check API Health:**
   ```bash
   curl http://localhost:5000/health
   ```
2. **Fetch Live Data:**
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

This file will continue to evolve as the API is fully integrated with real data collection and hardware functionality.