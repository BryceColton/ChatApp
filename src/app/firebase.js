// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAUbcK93u1llVLYF1W51RY2DTxO2f2EN3k",
  authDomain: "newreactchat-6a60f.firebaseapp.com",
  projectId: "newreactchat-6a60f",
  storageBucket: "newreactchat-6a60f.appspot.com",
  messagingSenderId: "236312497062",
  appId: "1:236312497062:web:b6d3a33ee01435e1195d67",
  measurementId: "G-EYEW1QK7XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

