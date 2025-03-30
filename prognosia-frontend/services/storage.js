import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export async function uploadToFirebase(userId, file, filename) {
  try {
    const storageRef = ref(
      storage,
      `users/${userId}/${filename.split(".")[0] + "_" + Date.now() + ".pdf"}`
    );
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error subiendo el archivo:", error);
    throw error;
  }
}
