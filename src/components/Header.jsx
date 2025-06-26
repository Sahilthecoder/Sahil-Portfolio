// src/components/Header.jsx
import React from 'react';
import Menu from './Menu';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="resume.html">Resume</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="sitemap.xml">Sitemap</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
<ThemeToggle />