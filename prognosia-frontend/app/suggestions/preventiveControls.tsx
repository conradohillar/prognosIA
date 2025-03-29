import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function preventiveControls() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="calendar-check" size={18} color="#999" />
        <Text style={styles.title}>Chequeos Preventivos</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Controles Recomendados</Text>
        
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardIconContainer}>
              <FontAwesome5 name="heartbeat" size={24} color="#f44" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Control Cardiológico</Text>
              <Text style={styles.cardDueDate}>Vence en 2 semanas</Text>
              <Text style={styles.cardDescription}>
                Último control: hace 11 meses{'\n'}
                Se recomienda control anual
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardIconContainer}>
              <FontAwesome5 name="flask" size={24} color="#f44" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Análisis de Sangre</Text>
              <Text style={styles.cardDueDate}>Vence en 1 mes</Text>
              <Text style={styles.cardDescription}>
                Último control: hace 5 meses{'\n'}
                Se recomienda control semestral
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardIconContainer}>
              <FontAwesome5 name="tooth" size={24} color="#f44" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Control Odontológico</Text>
              <Text style={styles.cardDueDate}>¡Vencido!</Text>
              <Text style={styles.cardDescription}>
                Último control: hace 7 meses{'\n'}
                Se recomienda control semestral
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximas Vacunas</Text>
        
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardIconContainer}>
              <FontAwesome5 name="syringe" size={24} color="#f44" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Vacuna Antigripal</Text>
              <Text style={styles.cardDueDate}>Programar para Marzo 2024</Text>
              <Text style={styles.cardDescription}>
                Última aplicación: Marzo 2023{'\n'}
                Se recomienda aplicación anual
              </Text>
            </View>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  cardContainer: {
    gap: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardDueDate: {
    fontSize: 16,
    color: '#f44',
    fontWeight: '500',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
