// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9u5dcIJYDFe2FnR86DT64b2dlZIENxa8",
  authDomain: "foodorder-41810.firebaseapp.com",
  projectId: "foodorder-41810",
  storageBucket: "foodorder-41810.appspot.com",
  messagingSenderId: "633519846394",
  appId: "1:633519846394:web:bc07011de4a61c0ff96a43",
  measurementId: "G-E1EYCW5G2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
