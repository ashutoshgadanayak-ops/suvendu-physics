import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Web SDK Configuration
const firebaseConfig = {
  projectId: "suvendu-physics-dash",
  appId: "1:615522532840:web:7837a4c72c7101d132f85d",
  storageBucket: "suvendu-physics-dash.firebasestorage.app",
  apiKey: "AIzaSyBpKHjTigtFAGVGy_m6g0Kei3LWaQ0UhoQ",
  authDomain: "suvendu-physics-dash.firebaseapp.com",
  messagingSenderId: "615522532840",
  projectNumber: "615522532840"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Submits a new student/parent consultation request to Cloud Firestore.
 * @param {string} name - Student/parent full name
 * @param {string} email - Email address
 * @param {string} phone - Phone number
 * @param {string} grade - Target academic grade / stream
 * @param {string} role - Submitter role (student or parent)
 * @param {string} message - Additional goals/notes
 * @returns {Promise<{success: boolean, id?: string, error?: string}>}
 */
export async function submitConsultation(name, email, phone, grade, role, message) {
  try {
    const docRef = await addDoc(collection(db, "consultations"), {
      name: name || '',
      email: email || '',
      phone: phone || '',
      grade: grade || '',
      role: role || '',
      message: message || '',
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting consultation to Firestore:", error);
    return { success: false, error: error.message };
  }
}
