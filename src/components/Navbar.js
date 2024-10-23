// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';




function CustomNavbar() {
  return (
    <Navbar bg="light" expand="lg" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
      <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          {/* Caretaker dropdown */}
          <NavDropdown title="Caretaker" id="caretaker-dropdown">
            {/*<NavDropdown.Item href="#application">Caretaker Application</NavDropdown.Item>*/}
            <NavDropdown.Item href="#list">Caretaker List</NavDropdown.Item>
          </NavDropdown>

          {/* Care Recipient dropdown */}
          <NavDropdown title="Care Recipient" id="care-recipient-dropdown">
            <NavDropdown.Item href="#service-request">Caretaker Service Request</NavDropdown.Item>
            <NavDropdown.Item href="#list">Care Recipient List</NavDropdown.Item>
          </NavDropdown>

          {/* Guardian dropdown */}
          <NavDropdown title="Guardian" id="guardian-dropdown">
            <NavDropdown.Item href="#list">Guardian Profile List</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {/* Icons on the right side with equal spacing */}
        <Nav className="d-flex align-items-center">
          <Nav.Link href="/admin-profile-page" className="ms-3">
            <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '24px', color: '#007bff' }} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
