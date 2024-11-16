import React, { useState, useEffect, useRef } from "react";
import API from "../api";
import "./CollectData.css";
import axios from "axios";

function CollectData() {
  const [images, setImages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [cumulativeRotation, setCumulativeRotation] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let lastAngle = null;
  let zeroOffset = 0;

  useEffect(() => {
    API.get("/api/collect-data")
      .then((response) => {
        setImages(response.data.images);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    initializeCamera();
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  const detectQRCode = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = window.jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        const corners = code.location;
        const topLeft = corners.topLeftCorner;
        const topRight = corners.topRightCorner;

        const dx = topRight.x - topLeft.x;
        const dy = topRight.y - topLeft.y;
        const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        const normalizedAngle = (currentAngle + 360) % 360;

        if (lastAngle !== null) {
          let angleChange = normalizedAngle - lastAngle;

          if (angleChange > 180) {
            angleChange -= 360;
          } else if (angleChange < -180) {
            angleChange += 360;
          }

          setCumulativeRotation((prev) => prev + angleChange - zeroOffset);
        }

        lastAngle = normalizedAngle;
      }

      sendRotationData();

      requestAnimationFrame(detectQRCode);
    }
  };

  const sendRotationData = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/api/send-steering", {
        cumulativeRotation,
      });
    } catch (error) {
      console.error("Error sending steering data:", error);
    }
  };

  const calibrateZero = () => {
    zeroOffset = cumulativeRotation;
    setCumulativeRotation(0);
  };

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", detectQRCode);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", detectQRCode);
      }
    };
  }, [cumulativeRotation]);

  return (
    <div className="collect-data">
      <h1>Collect Data</h1>

      <div className="camera-grid">
        {images.map((image, index) => (
          <div className="camera-preview" key={index}>
            <img src={image} alt={`Camera ${index + 1}`} />
            <p>Camera {index + 1}</p>
          </div>
        ))}
      </div>

      <div className="controls">
        <button
          className={`control-btn ${isStreaming ? "stop" : "start"}`}
          onClick={toggleStreaming}
        >
          {isStreaming ? "Stop Data Stream" : "Start Data Stream"}
        </button>
        <button className="control-btn pause">Pause</button>
      </div>

      <div className="qr-tracker">
        <h2>Steering Angle Measurement</h2>
        <video ref={videoRef} autoPlay playsInline className="qr-video" />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div className="qr-output">
          <p>
            <strong>Cumulative Rotation:</strong> {cumulativeRotation.toFixed(2)}°
          </p>
          <button className="control-btn calibrate" onClick={calibrateZero}>
            Calibrate Zero
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollectData;