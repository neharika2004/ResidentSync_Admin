// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaServicestack, FaUserFriends, FaEnvelope } from 'react-icons/fa';
import './../Styles/sidebar.css';

const Sidebar = () => {
    const serviceOptions = [
        { title: "Guest Info", path: "/service1" },
        { title: "Visitors ", path: "/service2" },
        { title: "Payments", path: "/service3" },
        { title: "Service 4", path: "/service4" },
        { title: "Service 5", path: "/service5" },
        { title: "Service 6", path: "/service6" }
    ]; // Add your service options here

    const Dropdown = ({ options }) => {
        const [isOpen, setIsOpen] = React.useState(false);

        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };

        return (
            <div className="dropdown">
                <button onClick={toggleDropdown}>
                    <FaServicestack />
                    <span className='u'>Services</span>
                </button>
                {isOpen && (
                    <div className="dropdown-content">
                        {options.map((option, index) => (
                            <Link to={option.path} key={index}>
                                <h3>{option.title}</h3>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="sidebar">
            <div className="sidebar-toggle">
                <FaBars />
            </div>
            <ul>
                <li>
                    <Link to="/">
                        <FaHome /> <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Dropdown options={serviceOptions} />
                </li>
                <li>
                    <Link to="/resident">
                        <FaUserFriends /> <span>Residents</span>
                    </Link>
                </li>
                <li>
                    <Link to="/contact">
                        <FaEnvelope /> <span>Contact</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
