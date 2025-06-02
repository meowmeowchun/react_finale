// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM8Qt3sLWz4phPir1jvhD59zhnyMHSu_U",
  authDomain: "react-finale-52f77.firebaseapp.com",
  projectId: "react-finale-52f77",
  storageBucket: "react-finale-52f77.src/lib/firebase.jssrc/lib/firebase.jsfirebasestorage.app",
  messagingSenderId: "101036028124",
  appId: "1:101036028124:web:e8ef05f9e8f646482bc419",
  measurementId: "G-MJ3L763JMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};