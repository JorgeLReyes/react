// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCchrMhTSKanKZDdZsgb17whV30opi1cg",
  authDomain: "react-cursos-a3ca7.firebaseapp.com",
  projectId: "react-cursos-a3ca7",
  storageBucket: "react-cursos-a3ca7.firebasestorage.app",
  messagingSenderId: "655339010286",
  appId: "1:655339010286:web:0a201b383e78c9b8871bff",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseBD = getFirestore(FirebaseApp);
