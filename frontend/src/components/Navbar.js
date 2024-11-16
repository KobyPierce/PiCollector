import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="logo-container">
        <img
          src={process.env.PUBLIC_URL + "/media/Pi-Collector-Logo.svg"}
          alt="Pi Collector Logo"
          className="logo"
        />
        <button className="hamburger" onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      <div className={`nav-buttons ${isOpen || window.innerWidth > 768 ? "show" : "hide"}`}>
        <NavLink
          to="/collect"
          className={({ isActive }) =>
            `nav-button ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <img
            src={process.env.PUBLIC_URL + "/media/folder.svg"}
            alt="Collect Data Icon"
            className="icon"
          />
          Collect Data
        </NavLink>
        <NavLink
          to="/review"
          className={({ isActive }) =>
            `nav-button ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <img
            src={process.env.PUBLIC_URL + "/media/book.svg"}
            alt="Review Data Icon"
            className="icon"
          />
          Review Data
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-button ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <img
            src={process.env.PUBLIC_URL + "/media/settings.svg"}
            alt="Settings Icon"
            className="icon"
          />
          Settings
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;