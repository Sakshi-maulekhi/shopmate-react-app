// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsCzxr-0GHZm1NEsyXiuugrMPc8FPCSTY",
  authDomain: "reactjsauth-9b5df.firebaseapp.com",
  projectId: "reactjsauth-9b5df",
  storageBucket: "reactjsauth-9b5df.firebasestorage.app",
  messagingSenderId: "239572547738",
  appId: "1:239572547738:web:20b610cf3605878dd80723",
  measurementId: "G-PZBQS4GZX1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);