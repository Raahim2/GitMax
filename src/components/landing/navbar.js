import React from 'react';


const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <a href="/" className="navbar-logo">
          <img
            src="./logo.png"
            alt="Logo"
            className="logo-image"
          />
        </a>
        {/* <nav className="navbar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <a href="/" className="menu-link">Home</a>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link">Features</a>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link">Pricing</a>
            </li>
          </ul>
        </nav> */}
        <div className="navbar-actions">
          <a href="#" className="btn btn-primary">Login</a>
          <a href="#" className="btn btn-secondary">Login With Github</a>
        </div>
        <div className="hamburger-menu">
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
