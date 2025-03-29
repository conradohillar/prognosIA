import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDndFxud5f1bEEsUxFfqjaH2p8rteCoak8",
  authDomain: "prognosia-d904c.firebaseapp.com",
  projectId: "prognosia-d904c",
  storageBucket: "prognosia-d904c.firebasestorage.app",
  messagingSenderId: "529150887740",
  appId: "1:529150887740:web:3db08bd12cf72400a38039",
  measurementId: "G-1419PXHGHG",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configurar autenticación con persistencia
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializar Firestore y Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
