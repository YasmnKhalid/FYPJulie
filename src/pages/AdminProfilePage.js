import React, { useState, useEffect } from 'react';
import { updateAdminProfile, changeAdminPassword } from '../services/firestoreService';
import { getCurrentUser } from '../services/authService';
import { useNavigate } from 'react-router-dom'; // For navigation
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const AdminProfilePage = () => {
  const navigate = useNavigate(); // useNavigate hook for back navigation

  const [admin, setAdmin] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    darkMode: false,
    language: 'en',
    emailNotifications: true,
    smsNotifications: false,
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Fetch the admin details (assuming getCurrentUser fetches user info)
    const fetchAdminDetails = async () => {
      const user = await getCurrentUser(); // Fetch the user from authService.js
      if (user) {
        setAdmin({
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth,
          darkMode: user.darkMode,
          language: user.language,
          emailNotifications: user.emailNotifications,
          smsNotifications: user.smsNotifications,
        });
      }
    };

    fetchAdminDetails();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdmin({
      ...admin,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  // Submit profile updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAdminProfile(admin); // Call service to update profile
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Submit password changes
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await changeAdminPassword(password); // Call service to update password
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  // Function to go back
  const goBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="container mt-4">
      {/* Back Arrow */}
      <button onClick={goBack} className="btn btn-link">
        <i className="bi bi-arrow-left"></i> Back
      </button>

      <h2>Admin Profile</h2>
      <div className="row">
        {/* Profile Information Form - Left Side */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={admin.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Email (Non-editable)</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={admin.email}
                disabled
              />
            </div>
            <div className="form-group mb-3">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                value={admin.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={admin.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            {/* Save Changes Button */}
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>

        {/* Change Password Section - Right Side */}
        <div className="col-md-6">
          <h4>Change Password</h4>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group mb-3">
              <label>Current Password</label>
              <input
                type="password"
                className="form-control"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-warning">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
