import { StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{uri: 'https://via.placeholder.com/100'}}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
        
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.push('/editProfileModal')}
        >
          <FontAwesome name="edit" size={16} color="#fff" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información personal</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre de usuario</Text>
            <Text style={styles.infoValue}>@johndoe</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Teléfono</Text>
            <Text style={styles.infoValue}>+1 234 567 8900</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ubicación</Text>
            <Text style={styles.infoValue}>New York, USA</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sugerencias</Text>
        <View style={styles.suggestionsContainer}>
          <TouchableOpacity 
            style={styles.suggestionCard}
            onPress={() => router.push('/suggestions/preventiveControls')}
          >
            <View style={styles.suggestionIconContainer}>
              <FontAwesome5 name="heartbeat" size={24} color="#f44" />
            </View>
            <View style={styles.suggestionContent}>
              <Text style={styles.suggestionTitle}>Chequeos Preventivos</Text>
              <Text style={styles.suggestionDescription}>
                Basado en tu historial, te sugerimos algunos estudios preventivos
              </Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.suggestionCard}
            onPress={() => router.push('/suggestions/tendencies')}
          >
            <View style={styles.suggestionIconContainer}>
              <FontAwesome5 name="chart-line" size={24} color="#f44" />
            </View>
            <View style={styles.suggestionContent}>
              <Text style={styles.suggestionTitle}>Análisis de Tendencias</Text>
              <Text style={styles.suggestionDescription}>
                Mirá el progreso de tus indicadores de salud
              </Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  section: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000'
  },
  infoContainer: {
    gap: 15,
    backgroundColor: '#fff'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  suggestionsContainer: {
    gap: 12,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  suggestionContent: {
    flex: 1,
    marginRight: 12,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  suggestionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});
