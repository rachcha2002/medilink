// Loader.js
import React from "react";
import "./Loader.css"; // CSS for styling the loader
import { IMAGES } from "../../constants/images"; // Company logo

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-bars"></div>
        <img src={IMAGES.logo} alt="Company Logo" className="company-logo" />
      </div>
    </div>
  );
};

export default Loader;
