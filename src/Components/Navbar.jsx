// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './../Styles/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">MyCMS</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/clients">Clients</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <div className="navbar-actions">
                <span className="greeting">Hello Admin</span>
                <input type="text" placeholder="Search..." className="search-bar" />
                <button className="login-button">Login</button>
            </div>
        </nav>
    );
};

export default Navbar;
