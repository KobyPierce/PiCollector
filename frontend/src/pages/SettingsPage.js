import React, { useState, useEffect } from "react";
import API from "../api";

function SettingsPage() {
  const [cameras, setCameras] = useState([]);
  const [gyro, setGyro] = useState(null);

  useEffect(() => {
    API.get("/api/settings")
      .then((response) => {
        setCameras(response.data.cameras);
        setGyro(response.data.gyro);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  return (
    <div>
      <h1>Settings</h1>
      <h2>Camera Settings</h2>
      <ul>
        {cameras.map((camera, index) => (
          <li key={camera.id}>
            <label>
              Camera {index + 1} Name:
              <input
                type="text"
                value={camera.name}
                onChange={(e) => {
                  const newCameras = [...cameras];
                  newCameras[index].name = e.target.value;
                  setCameras(newCameras);
                }}
              />
            </label>
            <p>Resolution: {camera.resolution}</p>
          </li>
        ))}
      </ul>
      <h2>Gyro Settings</h2>
      {gyro ? (
        <div>
          <p>Device Name: {gyro.device_name}</p>
          <p>Connected: {gyro.connected ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>No gyro device connected.</p>
      )}
    </div>
  );
}

export default SettingsPage;