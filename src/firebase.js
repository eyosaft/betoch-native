// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpll2lomKA5VJyBWppUv70G4G_E0b_bjk",
  authDomain: "betoch-bord.firebaseapp.com",
  databaseURL: "https://betoch-bord-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "betoch-bord",
  storageBucket: "betoch-bord.appspot.com",
  messagingSenderId: "227576331894",
  appId: "1:227576331894:web:2f828485ed2bc5cca9e957",
  measurementId: "G-JGQ70ZY3TC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(app);
export const auth = getAuth();
export const fireDB = getDatabase(app);
export const google = new GoogleAuthProvider();
export const timestamp = serverTimestamp();
