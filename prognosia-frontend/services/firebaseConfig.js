import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../firebase-config.js";
import { getFirestore } from "firebase/firestore/lite";

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app, "prognosia");
export const storage = getStorage(
  app,
  "gs://prognosia-d904c.firebasestorage.app"
);
