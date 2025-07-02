// src/components/Menu.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.querySelector('.menu');
      const menuToggle = document.querySelector('.menu-toggle');
      
      if (isOpen && menu && !menu.contains(event.target) && !menuToggle.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Close menu when pressing Escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={toggleMenu}
        className="menu-toggle"
        aria-label="Toggle menu"
      >
        <span className={`menu-line ${isOpen ? 'menu-line-1' : ''}`}></span>
        <span className={`menu-line ${isOpen ? 'menu-line-2' : ''}`}></span>
        <span className={`menu-line ${isOpen ? 'menu-line-3' : ''}`}></span>
      </button>
      
      <div className={`menu-backdrop ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />
      
      <nav aria-label="Primary navigation">
        <ul id="primary-navigation" className={`menu ${isOpen ? 'open' : ''}`}>
          <li>
            <NavLink 
              to="/" 
              exact="true" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={() => setIsOpen(false)}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/resume" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={() => setIsOpen(false)}
            >
              Resume
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
