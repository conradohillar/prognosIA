import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function AnalysingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#f44" style={styles.spinner} />
        <Text style={styles.title}>Analizando síntomas</Text>
        <Text style={styles.description}>
          Estamos procesando tus síntomas junto con tu historial médico para 
          brindarte un análisis detallado y recomendaciones personalizadas.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spinner: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '80%',
  }
});
