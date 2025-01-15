// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import AdminDashboard from './pages/AdminDashboard';  // Import the Admin Dashboard
import AdminProfilePage from './pages/AdminProfilePage';
import GuardianList from './pages/GuardianList';
import CaretakerList from './pages/CaretakerList';
import  CareRecipientList from './pages/CareRecipientList';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
          <Route path="/login" element={<Login/>} /> 
          <Route path="/admin-profile-page" element={<AdminProfilePage />} /> 
          <Route path="/guardian-list-page" element={<GuardianList />} /> 
          <Route path="/caretaker-list-page" element={<CaretakerList />} /> 
          <Route path="/careRecipient-list-page" element={<CareRecipientList />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
