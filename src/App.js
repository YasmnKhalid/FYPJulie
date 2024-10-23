// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import AdminDashboard from './pages/AdminDashboard';  // Import the Admin Dashboard
import AdminProfilePage from './pages/AdminProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add Admin Dashboard Route */}
          <Route path="/admin-profile-page" element={<AdminProfilePage />} /> {/* Add Admin Profile Page Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
