import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function EditProfileModal() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [showSexPicker, setShowSexPicker] = useState(false);
  const [showActivityPicker, setShowActivityPicker] = useState(false);

  const getSexLabel = (value: string) => {
    switch(value) {
      case 'hombre': return 'Hombre';
      case 'mujer': return 'Mujer';
      case 'otro': return 'Otro';
      default: return 'Seleccione su sexo';
    }
  };

  const getActivityLabel = (value: string) => {
    switch(value) {
      case 'nunca': return 'Nunca';
      case 'una_vez': return 'Una vez por semana o menos';
      case 'una_tres': return 'Entre 1 y 3 veces por semana';
      case 'cuatro_seis': return 'Entre 4 y 6 veces por semana';
      case 'diario': return 'Todos los días';
      default: return 'Seleccione su nivel de actividad';
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <FontAwesome name="times" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Fecha de Nacimiento</Text>
          <DateTimePicker
            value={birthDate}
            mode="date"
            onChange={(event: DateTimePickerEvent, date?: Date) => {
              if (date) setBirthDate(date);
            }}
          />

          <Text style={styles.label}>Sexo</Text>
          <TouchableOpacity 
            style={styles.input}
            onPress={() => setShowSexPicker(true)}
          >
            <Text>{getSexLabel(sex)}</Text>
          </TouchableOpacity>
          {showSexPicker && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={sex}
                onValueChange={(itemValue: string) => {
                  setSex(itemValue);
                  setShowSexPicker(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione su sexo" value="" />
                <Picker.Item label="Hombre" value="hombre" />
                <Picker.Item label="Mujer" value="mujer" />
                <Picker.Item label="Otro" value="otro" />
              </Picker>
            </View>
          )}

          <View style={styles.rowContainer}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Altura (cm)</Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="Ingrese su altura"
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="Ingrese su peso"
              />
            </View>
          </View>

          <Text style={styles.label}>Alergias</Text>
          <TextInput
            style={styles.textArea}
            value={allergies}
            onChangeText={setAllergies}
            placeholder="Liste sus alergias"
            multiline
          />

          <Text style={styles.label}>Condiciones Preexistentes</Text>
          <TextInput
            style={styles.textArea}
            value={conditions}
            onChangeText={setConditions}
            placeholder="Liste sus condiciones médicas"
            multiline
          />

          <Text style={styles.label}>Nivel de Actividad Física</Text>
          <TouchableOpacity 
            style={styles.input}
            onPress={() => setShowActivityPicker(true)}
          >
            <Text>{getActivityLabel(activityLevel)}</Text>
          </TouchableOpacity>
          {showActivityPicker && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={activityLevel}
                onValueChange={(itemValue: string) => {
                  setActivityLevel(itemValue);
                  setShowActivityPicker(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione su nivel de actividad" value="" />
                <Picker.Item label="Nunca" value="nunca" />
                <Picker.Item label="Una vez por semana o menos" value="una_vez" />
                <Picker.Item label="Entre 1 y 3 veces por semana" value="una_tres" />
                <Picker.Item label="Entre 4 y 6 veces por semana" value="cuatro_seis" />
                <Picker.Item label="Todos los días" value="diario" />
              </Picker>
            </View>
          )}

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeBtn: {
    padding: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    padding: 0,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8, // To compensate for the marginTop in label
  },
  halfInput: {
    width: '48%',
  }
});
