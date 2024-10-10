// src/services/authService.js
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import necessary Firebase Auth functions
import { auth } from '../firebase';  // Import the initialized Firebase Auth instance

/**
 * Function to handle user login.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise} Promise object represents user credentials or error.
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;  // Return the user object
  } catch (error) {
    throw error;  // Propagate the error to be handled in the component
  }
};
