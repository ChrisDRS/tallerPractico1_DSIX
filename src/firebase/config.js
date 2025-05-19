// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQmLMscTFbxhOnayCG6kAyBFolKNYPU5k",
  authDomain: "proyecto-1---dsix.firebaseapp.com",
  projectId: "proyecto-1---dsix",
  storageBucket: "proyecto-1---dsix.firebasestorage.app",
  messagingSenderId: "1013489088072",
  appId: "1:1013489088072:web:f35811af1d03c33a2a0a7d",
  measurementId: "G-6T4NR2XD5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);