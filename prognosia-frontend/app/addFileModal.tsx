import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { DocumentPickerAsset } from 'expo-document-picker';

export default function AddFileModal() {
  const [selectedFile, setSelectedFile] = useState<DocumentPickerAsset | null>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
      
      if (result.assets && result.assets[0]) {
        const file = result.assets[0];
        setSelectedFile(file);
        console.log('Selected file:', file.uri);

        // Generate preview URI for PDF
        const previewUri = file.uri;
        setPdfUri(previewUri);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.mimeType || 'application/pdf',
        name: selectedFile.name
      } as any);

      // Send file to backend
      const response = await fetch('YOUR_API_ENDPOINT/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        router.back();
      } else {
        console.error('Upload failed:', await response.text());
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <FontAwesome name="times" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.title}>Agregar Documento</Text>
      </View>

      {!selectedFile ? (
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <FontAwesome name="file-pdf-o" size={48} color="#e74c3c" />
          <Text style={styles.uploadText}>Seleccionar PDF</Text>
          <Text style={styles.uploadSubtext}>Toque para elegir un archivo</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.previewContainer}>
          <View style={styles.fileInfo}>
            <FontAwesome name="file-pdf-o" size={36} color="#e74c3c" />
            <Text style={styles.fileName}>{selectedFile.name}</Text>
            <Text style={styles.fileSize}>
              {((selectedFile.size ?? 0) / 1024 / 1024).toFixed(2)} MB
            </Text>
            <TouchableOpacity 
              style={styles.changeFileButton}
              onPress={pickDocument}
            >
              <Text style={styles.changeFileText}>Cambiar archivo</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={uploadFile}
          >
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  uploadButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#666',
  },
  previewContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  fileSize: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  changeFileButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  changeFileText: {
    color: '#666',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
