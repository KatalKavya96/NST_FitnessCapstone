// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCXZ88aJbmC8f2XXercmHpqjEouhzVpAvM",
    authDomain: "capstone-12bb5.firebaseapp.com",
    projectId: "capstone-12bb5",
    storageBucket: "capstone-12bb5.firebasestorage.app",
    messagingSenderId: "799023368874",
    appId: "1:799023368874:web:8344d554ea62f1aacc5ed3",
    measurementId: "G-P09FLQG6RL"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
