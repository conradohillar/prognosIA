import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { getFiles } from '@/services/storage';
import { useGlobalState }  from '../_layout';

export default function MedicalHistoryScreen() {
  // const medicalRecords = [
  //   {
  //     id: '1',
  //     title: 'Consulta General - Dr. Smith', 
  //     date: '2023-12-01',
  //     fileSize: '2.1 MB'
  //   },
  //   {
  //     id: '2',
  //     title: 'Resultados Análisis de Sangre',
  //     date: '2023-11-15', 
  //     fileSize: '1.5 MB'
  //   },
  //   {
  //     id: '3',
  //     title: 'Radiografía de Tórax',
  //     date: '2023-10-30',
  //     fileSize: '3.2 MB'
  //   }
  // ];
  const { globalState } = useGlobalState();

  interface MedicalRecord {
    id: string;
    title: string;
    date: string;
    fileSize: string;
  }
  
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  
  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getFiles(globalState.userId);
      const mappedRecords = files.map((file: any) => ({
        id: file.id,
        title: file.name || 'Unknown Title',
        date: file.date || 'Unknown Date',
        fileSize: file.size || 'Unknown Size',
      }));
      setMedicalRecords(mappedRecords);
      console.log('Medical records:', mappedRecords);
    };
    fetchFiles();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Documentos médicos y resultados</Text>
      
      <ScrollView style={styles.recordsList}>
        {medicalRecords.map((record: any) => (
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