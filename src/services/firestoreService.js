// src/services/firestoreService.js
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../firebase';  // Import the initialized Firestore instance
import { getAuth, updatePassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getFirestore} from 'firebase/firestore';

const ab = getFirestore();
   

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





// Fetch guardian details by ID
export const getGuardianById = async (guardianId) => {
  if (!guardianId) return null;
  const guardianDoc = await getDoc(doc(db, 'users', guardianId)); // Assuming guardians are in 'users' collection
  if (guardianDoc.exists()) {
    return guardianDoc.data();
  }
  return null;
};


export const getCaretakers = async () => {
  const caretakers = [];
  const q = query(collection(db, 'users'), where('role', '==', 'caretaker')); // Query where role == caretaker

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    caretakers.push({ id: doc.id, ...doc.data() }); // Include document ID and its data
  });

  return caretakers;
};

export const getGuardians = async () => {
  const guardians = [];
  const querySnapshot = await getDocs(collection(db, 'users')); // Assuming guardians are in 'users' collection
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.role === 'guardian') {
      guardians.push({ id: doc.id, ...data });
    }
  });
  return guardians;
};

// Fetch care recipient by ID
export const getCareRecipientById = async (careRecipientId) => {
  if (!careRecipientId) return null;
  const careRecipientDoc = await getDoc(doc(db, 'care_recipients', careRecipientId));
  if (careRecipientDoc.exists()) {
    return careRecipientDoc.data();
  }
  return null;
};
export const getCareRecipients = async () => {
  const careRecipients = [];
  const querySnapshot = await getDocs(collection(db, 'care_recipients')); // Replace with your collection name if different
  querySnapshot.forEach((doc) => {
    careRecipients.push({ id: doc.id, ...doc.data() });
  });
  return careRecipients;
};

