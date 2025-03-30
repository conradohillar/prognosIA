import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore/lite";

import { db } from "./firebaseConfig";

async function addUserDoc(docId, email) {
  try {
    const userRef = doc(db, "users", docId);
    await setDoc(userRef, { email: email }, { merge: true });
    console.log("Documento creado con ID:", docId);
  } catch (e) {
    console.error("Error al crear el documento:", e);
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

async function editProfile(
  user_id,
  name,
  gender,
  weight_kg,
  height_cm,
  physical_activity_level,
  allergies,
  preexisting_conditions,
  birth_date
) {
  try {
    const userRef = doc(db, "users", user_id);

    // Crear objeto con solo los valores definidos
    const updates = Object.fromEntries(
      Object.entries({
        name,
        gender,
        weight_kg,
        height_cm,
        physical_activity_level,
        allergies,
        preexisting_conditions,
        birth_date,
      }).filter(([_, v]) => v !== undefined)
    );

    if (Object.keys(updates).length === 0) {
      console.log("No hay datos para actualizar.");
      return;
    }

    await updateDoc(userRef, updates);
    console.log("Perfil actualizado con éxito");
  } catch (error) {
    throw new Error("Error al actualizar el perfil:", error.message);
  }
}

export { addUser, addFile, getUser, addUserDoc, editProfile };
