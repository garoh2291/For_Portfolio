import { useState } from "react";
import { Link } from "react-router-dom";
import { NAVBAR_PAGES } from "../../data";
import { NavItem } from "./NavItem";
import "./styles.css";

const { home, project, contact, aboutMe } = NAVBAR_PAGES;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <nav className="nav_bar">
        <span className="nav_logo">
          <Link to="/">Portfolio</Link>{" "}
        </span>

        <ul className={`nav_menu ${isOpen && "open"}`}>
          <NavItem label={home.label} link={home.link} onclose={onClose} />
          <NavItem
            label={project.label}
            link={project.link}
            onclose={onClose}
          />
          <NavItem
            label={contact.label}
            link={contact.link}
            onclose={onClose}
          />
          <NavItem
            label={aboutMe.label}
            link={aboutMe.link}
            onclose={onClose}
          />
        </ul>
        <div
          className={`nav-toggle ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="bar "></div>
        </div>
      </nav>
    </>
  );
};
