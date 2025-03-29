import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../config/firebaseConfig";

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
