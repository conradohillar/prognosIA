// Import the functions you need from the SDKs you need
import { initializeApp, signInWithPopup } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDndFxud5f1bEEsUxFfqjaH2p8rteCoak8",
  authDomain: "prognosia-d904c.firebaseapp.com",
  projectId: "prognosia-d904c",
  storageBucket: "prognosia-d904c.firebasestorage.app",
  messagingSenderId: "529150887740",
  appId: "1:529150887740:web:3db08bd12cf72400a38039",
  measurementId: "G-1419PXHGHG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
