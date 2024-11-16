import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CollectData from "./pages/CollectData";
import ReviewData from "./pages/ReviewData";
import SettingsPage from "./pages/SettingsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/collect" element={<CollectData />} />
            <Route path="/review" element={<ReviewData />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;