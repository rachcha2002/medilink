import React from "react";
import NavLink from "./NavLink";

function NavItem({ nav }) {
  return (
    <li className="nav-item">
      {nav.children && nav.children.length > 0 ? (
        <NavLink
          href={`#nav-${nav._id}`}
          icon={nav.icon}
          title={nav.name}
          hasSubmenu
        >
          <i className="bi bi-chevron-down ms-auto"></i>
        </NavLink>
      ) : (
        <NavLink href={nav.href} icon={nav.icon} title={nav.name} />
      )}

      {nav.children && nav.children.length > 0 && (
        <ul
          id={`nav-${nav._id}`}
          className="nav-content collapse"
          data-bs-parent="#sidebar-nav"
        >
          {nav.children.map((childNav) => (
            <li key={childNav._id} className="nav-item">
              <NavLink
                href={childNav.href}
                icon={childNav.icon}
                title={childNav.name}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavItem;
