import React from "react";
import { NavLink } from "react-router-dom";

export const NavItem = ({ label, link, onclose }) => {
  return (
    <li className="nav__item">
      <NavLink
        onClick={onclose}
        to={`/${link}`}
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        {label}
      </NavLink>
    </li>
  );
};
