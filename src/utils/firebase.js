// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "netflixgpt-d1444.firebaseapp.com",
  projectId: "netflixgpt-d1444",
  storageBucket: "netflixgpt-d1444.appspot.com",
  messagingSenderId: "309156973354",
  appId: "1:309156973354:web:56e2b16a5de5ab5d2fec53",
  measurementId: "G-DZZJKWNEDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
