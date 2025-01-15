import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../style/Navbar.css'; // Custom CSS for navbar

function CustomNavbar({ onExportReport }) {
  // Logout handler function
  const handleLogout = () => {
    // Clear authentication data (e.g., tokens, session storage)
    localStorage.removeItem('authToken'); // Example for token-based auth

    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="custom-navbar"
      style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
    >
      <Navbar.Brand href="/admin-dashboard">Admin Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* Caretaker dropdown */}
          <NavDropdown title="Caretaker" id="caretaker-dropdown">
            <NavDropdown.Item href="/caretaker-list-page">Caretaker List</NavDropdown.Item>
          </NavDropdown>

          {/* Care Recipient dropdown */}
          <NavDropdown title="Care Recipient" id="care-recipient-dropdown">
            <NavDropdown.Item href="/careRecipient-list-page">Care Recipient List</NavDropdown.Item>
          </NavDropdown>

          {/* Guardian dropdown */}
          <NavDropdown title="Guardian" id="guardian-dropdown">
            <NavDropdown.Item href="/guardian-list-page">Guardian Profile List</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {/* Export Button */}
        <Nav className="d-flex align-items-center">
          {/* Profile Icon */}
          <Nav.Link href="/admin-profile-page">
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{ fontSize: '24px', color: '#007bff' }}
            />
          </Nav.Link>
          <Button
            className="logout-button ms-3"
            onClick={handleLogout}
          >
            Logout
          </Button>


        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
