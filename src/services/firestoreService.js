// src/services/firestoreService.js
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../firebase';  // Import the initialized Firestore instance
import { getAuth, updatePassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
   

// Function to update the admin's profile in Firestore
export const updateAdminProfile = async (admin) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, 'users', user.uid);  // Assuming you store users in Firestore
    await updateDoc(userRef, {
      fullName: admin.fullName,
      phoneNumber: admin.phoneNumber,
      dateOfBirth: admin.dateOfBirth,
      darkMode: admin.darkMode,
      language: admin.language,
      emailNotifications: admin.emailNotifications,
      smsNotifications: admin.smsNotifications,
    });
  }
};

// Function to change the admin's password
export const changeAdminPassword = async (newPassword) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    await updatePassword(user, newPassword);
  }
};


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

//Function to amik data guardan dari db

export const getGuardians = async () => {
  const q = query(collection(db, 'users'), where('role', '==', 'guardian'));
  const querySnapshot = await getDocs(q);
  
  // Map through the documents and ensure necessary fields have values
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    
    // Return the data with default values if some fields are missing
    return {
      id: data.id || '', 
      name: data.name || 'Unknown', 
      state: data.state || '', 
      dependentName: data.dependentName || '', 
      dependentStatus: data.dependentStatus || '', 
      caretakerServiceStatus: data.caretakerServiceStatus || '' 
    };
  });
};
