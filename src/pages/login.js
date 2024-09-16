// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import to handle navigation
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import necessary Firebase Auth function
import { doc, getDoc } from 'firebase/firestore';  // Import Firestore functions
import { auth, db } from '../firebase';  // Import initialized Firebase services
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
      // Sign in with email and password using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get the user's document from the 'users' collection using the UID
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin') {
          console.log('Admin logged in!');
          navigate('/admin-dashboard');  // Navigate to the Admin Dashboard page
        } else {
          setError('You are not authorized as an admin.');
        }
      } else {
        setError('User data not found.');
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
