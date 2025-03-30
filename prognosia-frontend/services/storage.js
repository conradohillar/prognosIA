import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadToFirebase(userId, file) {
  try {
    const storageRef = ref(storage, `users/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error subiendo el archivo:", error);
    throw error;
  }
}
