import React from 'react';
import '../Styles/main.css';

function Navbar({toggleDrawer, ...props}) {
  return (
    <nav className="navbar">
      <div className="logo">My App</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/">About</a></li>
        <li><a href="/">Contact</a></li>
      {window.location.pathname.toLowerCase().startsWith('/editor') && <div className="menu-toggle" onClick={toggleDrawer}>
      <i className="fa-solid fa-users-line"></i>
      </div>}
      </ul>
    </nav>
  );
}

export default Navbar;