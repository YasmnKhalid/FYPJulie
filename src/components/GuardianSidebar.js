import React, { useState } from "react";
import {
    FaHome,
    FaUserPlus,
    FaClipboardList,
    FaPills,
    FaTasks,
    FaCalendarAlt,
    FaHeartbeat,
} from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom"; // Import Link for navigation
import CareRecipientForm from "../components/CareRecipientForm"; // Import the form component
import "../style/Sidebar.css";

const Sidebar = () => {
    const [isTrackerOpen, setTrackerOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleLogout = () => {
        // Clear authentication data (e.g., tokens, session storage)
        localStorage.removeItem("authToken"); // Example for token-based auth

        // Redirect to login page
        window.location.href = "/login";
    };

    const handleFormSubmit = (data) => {
        console.log("Form submitted:", data);
        // Save data to Firestore or handle it here
        setShowForm(false); // Close the form after submission
    };

    return (
        <div className="sidebar">
            {/* Sidebar Icon/Logo */}
            <div className="sidebar-icon-container">
                <img
                    src="/assets/logoJulie.png"
                    alt="Sidebar Logo"
                    className="sidebar-logo"
                />
                <div className="logo-text">Julie</div>
            </div>

            <ul className="sidebar-menu">
                {/* Home */}
                <li className="menu-item">
                    <FaHome className="menu-icon" />
                    <span className="menu-text">Home</span>
                </li>

                {/* Add Dependent */}
                <li className="menu-item">
                    <Link to="/add-dependent" className="menu-link">
                        <FaUserPlus className="menu-icon" />
                        <span className="menu-text">Add Dependent</span>
                    </Link>
                </li>


                {/* Dependent Profile */}
                <li className="menu-item">
                    <Link to="/dependent-profile" className="menu-link">
                        <IoPeople className="menu-icon" />
                        <span className="menu-text">Dependent Profile</span>
                    </Link>
                </li>

                {/* Add Tracker Criteria */}
                <li
                    className="menu-item"
                    onClick={() => setTrackerOpen(!isTrackerOpen)}
                >
                    <FaClipboardList className="menu-icon" />
                    <span className="menu-text">Add Tracker Criteria</span>
                    <span className="dropdown-icon">
                        {isTrackerOpen ? <IoChevronDown /> : <IoChevronForward />}
                    </span>
                </li>

                {/* Submenu for Tracker Criteria */}
                {isTrackerOpen && (
                    <ul className="submenu">
                        <li className="submenu-item">
                            <FaPills className="submenu-icon" />
                            <span className="submenu-text">Medication</span>
                        </li>
                        <li className="submenu-item">
                            <FaTasks className="submenu-icon" />
                            <span className="submenu-text">Task</span>
                        </li>
                        <li className="submenu-item">
                            <FaCalendarAlt className="submenu-icon" />
                            <span className="submenu-text">Appointment</span>
                        </li>
                        <li className="submenu-item">
                            <FaHeartbeat className="submenu-icon" />
                            <span className="submenu-text">
                                Symptom/Side Effect Tracking
                            </span>
                        </li>
                    </ul>
                )}

                {/* Logout */}
                <li className="menu-item" onClick={handleLogout}>
                    <MdLogout className="menu-icon" />
                    <span className="menu-text">Log out</span>
                </li>
            </ul>

            {/* Render the form if `showForm` is true */}
            {showForm && (
                <div className="form-overlay">
                    <div className="form-container">
                        <CareRecipientForm onSubmit={handleFormSubmit} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
