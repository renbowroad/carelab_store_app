// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKH6TSwSSgDFzaAq4dUPGW4jTK1qYXg7Y",
  authDomain: "carelab-store-app-dev.firebaseapp.com",
  projectId: "carelab-store-app-dev",
  storageBucket: "carelab-store-app-dev.appspot.com",
  messagingSenderId: "370354359305",
  appId: "1:370354359305:web:9c4a7bdc3d36adefe77cd8",
  measurementId: "G-9GLD3QK6G9",
};

// Initialize Firebase
if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
