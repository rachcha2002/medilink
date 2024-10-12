import React from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { IMAGES } from "../../../constants/images";
import { useAuthContext } from "../../../context/AuthContext";

function NavAvatar() {
  const { user, logout, usertype } = useAuthContext(); // Assuming logout is part of the context
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Show confirmation dialog before logging out
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      // Call the logout function from AuthContext
      logout();
      // Navigate to login page after logout
      navigate("/login");
    }
  };

  // Determine the name to display based on usertype
  const displayName = usertype === "hospitaladmin" ? user?.adminName : user?.name;

  return (
    <Dropdown align="end" className="nav-item pe-3">
      <Dropdown.Toggle
        as="a"
        className="nav-link nav-profile d-flex align-items-center pe-0"
        id="dropdown-custom-components"
      >
        <Image
          src={IMAGES.user}
          alt="Profile"
          className="rounded-circle"
          width="40"
          height="40"
        />
        <span className="d-none d-md-block ps-2">{displayName ? displayName : "F. David"}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-end dropdown-menu-arrow profile">
        <Dropdown.Header>
          <h6>{displayName ? displayName : "David"}</h6>
          <span>{user ? user.role : "Web Developer"}</span>
        </Dropdown.Header>
        <Dropdown.Divider />

        <Dropdown.Item href="/users-profile">
          <i className="bi bi-person"></i> My Profile
        </Dropdown.Item>
        <Dropdown.Divider />

        <Dropdown.Item onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavAvatar;
