// src/services/firestoreService.js
import { doc, getDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../firebase';  // Import the initialized Firestore instance

/**
 * Function to fetch user data from Firestore.
 * @param {string} uid - User ID.
 * @returns {Promise} Promise object represents user data or error.
 */
export const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();  // Return the user data
    } else {
      throw new Error('User data not found.');
    }
  } catch (error) {
    throw error;  // Propagate the error to be handled in the component
  }
};

