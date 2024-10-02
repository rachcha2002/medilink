import React from "react";
import "./Logo.css";
import { IMAGES } from "../../constants/images";

export default function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      <i
        className="bi bi-list toggle-sidebar-btn"
        onClick={handleToggleSideBar}
      ></i>
      <a href="/" className="logo d-flex align-items-center">
        <img src={IMAGES.logo} alt="Logo" />
      </a>
    </div>
  );
}
