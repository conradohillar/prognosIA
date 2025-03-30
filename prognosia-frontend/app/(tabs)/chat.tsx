import { StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ChatScreen() {

  const [sintomas, setSintomas] = useState('');
  const [medicamentos, setMedicamentos] = useState('');

  const router = useRouter();
  
  const enviarInformacion = () => {
    // Procesar la información y navegar a la pantalla de resultados
    router.replace('/analysing');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titulo}>Contame sobre tu situación</Text>
        <Text style={styles.subtitulo}>Utilizaré tu historia clínica, tus características físicas, y una breve descripicioń de tus síntomas y medicamentos para analizar tu estado de salud actual.</Text>
        
        <View style={styles.inputGroup}>
          <View style={styles.inputHeader}>
            <FontAwesome5 name="notes-medical" size={20} color="#f44" />
            <Text style={styles.inputTitle}>Síntomas</Text>
          </View>
          <TextInput
            style={styles.textAreaSymptoms}
            value={sintomas}
            onChangeText={setSintomas}
            placeholder="Describe los síntomas que estás experimentando..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputHeader}>
            <FontAwesome5 name="pills" size={20} color="#f44" />
            <Text style={styles.inputTitle}>Medicamentos</Text>
            <Text>  (Opcional)</Text>
          </View>
          <TextInput
            style={styles.textAreaMeds}
            value={medicamentos}
            onChangeText={setMedicamentos}
            placeholder="¿Estás tomando algún medicamento? Esta información puede ser útil para profundizar el análisis."
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={styles.botonEnviar}
          onPress={enviarInformacion}
        >
          <Text style={styles.botonTexto}>Analizar Síntomas</Text>
          <FontAwesome5 name="arrow-right" size={16} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 30,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  textAreaSymptoms: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#aaa',
    fontSize: 16,
    color: '#333',
    minHeight: 150,
  },
  textAreaMeds: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#aaa',
    fontSize: 16,
    color: '#333',
    minHeight: 100,
  },
  botonEnviar: {
    backgroundColor: '#f44',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
});
