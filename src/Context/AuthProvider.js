// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC43eW6BDBXfKdxz6MRsG9lMUn7MewJqbA",
  authDomain: "linkup-f4145.firebaseapp.com",
  projectId: "linkup-f4145",
  storageBucket: "linkup-f4145.firebasestorage.app",
  messagingSenderId: "1046657452154",
  appId: "1:1046657452154:web:d1099ae1efb3d7c7b193c3",
  measurementId: "G-D0M5SB8270"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth
export const db = getFirestore(app);