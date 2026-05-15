// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace this with your actual Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyBUrvuQG62hIJccgGarDM6fpOKlrY3O-kU",
  authDomain: "evon-final.firebaseapp.com",
  projectId: "evon-final",
  storageBucket: "evon-final.firebasestorage.app",
  messagingSenderId: "832507541607",
  appId: "1:832507541607:web:a54de97a92feb3103cbcc2",
  measurementId: "G-57RFML5DCK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);