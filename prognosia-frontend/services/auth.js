import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Usuario registrado:", user);
    return user;
  } catch (error) {
    console.error("Error en el registro:", error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
    return user;
  } catch (error) {
    console.error("Error en el login:", error.message);
  }
};
