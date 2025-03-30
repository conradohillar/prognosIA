import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";
import { storage } from "./firebaseConfig";

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

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

export async function getFiles(userId) {
  try {
    const storageRef = ref(storage, `/users/${userId}`);
    const files = await listAll(storageRef);
    console.log("Archivos:", files);

    const filesData = await Promise.all(
      files.items.map(async (item) => {
        // Obtener metadatos del archivo
        const metadata = await getMetadata(item);

        // Obtener URL del archivo
        const url = await getDownloadURL(item);

        return {
          name: metadata.name,
          size: formatFileSize(metadata.size),
          updatedAt: new Date(metadata.updated).toLocaleString(), // Fecha legible
          url: url,
        };
      })
    );

    return filesData;
  } catch (error) {
    console.error("Error obteniendo los archivos:", error);
    throw error;
  }
}
