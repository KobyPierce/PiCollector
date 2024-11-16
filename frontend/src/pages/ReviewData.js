import React, { useState, useEffect } from "react";
import API from "../api";

function ReviewData() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    API.get("/api/review-data")
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  return (
    <div>
      <h1>Review Data</h1>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <strong>{session.name}</strong> - {session.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewData;