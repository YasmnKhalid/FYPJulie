// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import to handle navigation
import { loginUser } from '../services/authService';  // Import login service
import { getUserData } from '../services/firestoreService';  // Import Firestore service
import '../style/login.css';  // Ensure the path to CSS is correct
import TextLogo from '../components/TextLogo';

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
      <div className="login-card">
        <div className="login-left">

          {/* Add the logo here */}
          <div className="logo-container">
            <span className="logo">Julie</span>
          </div>
          <h2>Welcome!</h2>
          <p>Caring Made Simple, Lives Made Better</p>
        </div>
        <div className="login-right">
          <h2>Sign In</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="input-field"
              />
            </div>
            <div className="remember-me">
              <label className="checkbox-label">
                <input type="checkbox" id="remember" />
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
