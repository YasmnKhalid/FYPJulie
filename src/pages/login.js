// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import to handle navigation
import { loginUser } from '../services/authService';  // Import login service
import { getUserData } from '../services/firestoreService';  // Import Firestore service
import '../style/login.css';  // Ensure the path to CSS is correct

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous errors
    try {
      const user = await loginUser(email, password);  // Use the service function to login

      const userData = await getUserData(user.uid);  // Use the service function to get user data

      if (userData.role === 'admin') {
        console.log('Admin logged in!');
        navigate('/admin-dashboard');  // Navigate to the Admin Dashboard page
      } else {
        setError('You are not authorized as an admin.');
      }
    } catch (err) {
      setError(err.message);  // Display error message
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required 
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
            required 
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        {error && <p className="error-message">{error}</p>} {/* Display errors */}
      </form>
    </div>
  );
}

export default Login;
