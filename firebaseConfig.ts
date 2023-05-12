import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAlK5f92IeheAo0aONhbdlrn-Vse-3W2vQ",
  authDomain: "firenativetodo.firebaseapp.com",
  projectId: "firenativetodo",
  storageBucket: "firenativetodo.appspot.com",
  messagingSenderId: "763503443467",
  appId: "1:763503443467:web:fe3d8d6e87b90abfce510e",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
