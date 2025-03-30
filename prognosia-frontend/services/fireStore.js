import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";

import { db } from "./firebaseConfig";

async function addUserDoc(email) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      email,
    });
    console.log("Documento escrito con ID: ", docRef.id);
  } catch (e) {
    console.error("Error añadiendo documento: ", e);
  }
}

async function addUser(
  user_id,
  name,
  email,
  gender,
  weight_kg,
  height_cm,
  physical_activity_level,
  allergies,
  preexisting_conditions,
  birth_date,
  profilePicture
) {
  const db = getFirestore();
  const userRef = doc(db, "users", user_id);

  await setDoc(userRef, {
    name,
    email,
    gender,
    weight_kg,
    height_cm,
    physical_activity_level,
    allergies,
    preexisting_conditions,
    birth_date,
    profilePicture: profilePicture,
    files: [],
  });

  console.log("Usuario agregado a Firestore:", user_id);
}

async function addFile(user_id, file) {
  const db = getFirestore();
  const userRef = doc(db, "users", user_id);

  await setDoc(
    userRef,
    {
      files: file,
    },
    { merge: true }
  );

  console.log("Archivo agregado a Firestore:", file);
}

async function getUser(user_id) {
  const db = getFirestore();
  const userRef = doc(db, "users", user_id);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    console.log("Usuario encontrado:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No se encontró el usuario");
    return null;
  }
}

export { addUser, addFile, getUser, addUserDoc };
