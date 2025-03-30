import { StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { getFiles } from '@/services/storage';
import { useGlobalState }  from '../_layout';

export default function MedicalHistoryScreen() {
  const { globalState } = useGlobalState();
  const [loading, setLoading] = useState(true);

  interface MedicalRecord {
    id: string;
    title: string;
    date: string;
    fileSize: string;
  }
  
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const files = await getFiles(globalState.userId);
        const mappedRecords = files.map((file: any, index: number) => ({
          id: `${file.name}_${index}`,
          title: file.name || 'Unknown Title',
          date: file.date || 'Unknown Date',
          fileSize: file.size || 'Unknown Size',
        }));
        setMedicalRecords(mappedRecords);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#f44" />
        <Text style={styles.loadingText}>Cargando documentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Documentos médicos y resultados</Text>
      
      <ScrollView style={styles.recordsList}>
        {medicalRecords.map((record: MedicalRecord) => (
          <TouchableOpacity key={record.id} style={styles.recordItem}>
            <View style={styles.recordIcon}>
              <FontAwesome name="file-pdf-o" size={24} color="#f00" />
            </View>
            <View style={styles.recordInfo}>
              <Text style={styles.recordTitle}>{record.title}</Text>
              <Text style={styles.recordDate}>{record.date}</Text>
            </View>
            <Text style={styles.fileSize}>{record.fileSize}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Link href="/addFileModal" asChild>
        <TouchableOpacity style={styles.floatingButton}>
          <FontAwesome name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  recordsList: {
    flex: 1,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  recordIcon: {
    marginRight: 15,
    backgroundColor: '#fff'
  },
  recordInfo: {
    backgroundColor: '#fff',
    flex: 1,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recordDate: {
    fontSize: 14,
    color: '#666',
  },
  fileSize: {
    fontSize: 12,
    color: '#999',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#f44',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});