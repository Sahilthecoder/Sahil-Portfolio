// src/components/Menu.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav aria-label="Primary navigation">
      <button
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={toggleMenu}
        className="menu-toggle"
      >
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      <ul id="primary-navigation" className={`menu ${isOpen ? 'open' : 'closed'}`}>
        <li>
          <NavLink to="/" exact="true" activeclassname="active" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeclassname="active" onClick={() => setIsOpen(false)}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" activeclassname="active" onClick={() => setIsOpen(false)}>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/resume" activeclassname="active" onClick={() => setIsOpen(false)}>
            Resume
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeclassname="active" onClick={() => setIsOpen(false)}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
