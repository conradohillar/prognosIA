import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
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
  const [openSex, setOpenSex] = useState(false);
  const [openActivity, setOpenActivity] = useState(false);

  const sexItems = [
    {label: 'Hombre', value: 'hombre'},
    {label: 'Mujer', value: 'mujer'},
    {label: 'Otro', value: 'otro'}
  ];

  const activityItems = [
    {label: 'Nunca', value: 'nunca'},
    {label: 'Una vez por semana o menos', value: 'una_vez'},
    {label: 'Entre 1 y 3 veces por semana', value: 'una_tres'},
    {label: 'Entre 4 y 6 veces por semana', value: 'cuatro_seis'},
    {label: 'Todos los días', value: 'diario'}
  ];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <FontAwesome name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            
            <Text style={styles.label}>Fecha de Nacimiento</Text>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={birthDate}
                mode="date"
                onChange={(event: DateTimePickerEvent, date?: Date) => {
                  if (date) setBirthDate(date);
                }}
                style={styles.datePicker}
              />
            </View>

            <Text style={styles.label}>Sexo</Text>
            <DropDownPicker
              open={openSex}
              value={sex}
              items={sexItems}
              setOpen={setOpenSex}
              setValue={setSex}
              placeholder="Seleccione su sexo"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholderStyle={styles.dropdownPlaceholder}
            />

            <View style={styles.rowContainer}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Altura (cm)</Text>
                <TextInput
                  style={[styles.input, styles.numericInput]}
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  placeholder="Altura"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.label}>Peso (kg)</Text>
                <TextInput
                  style={[styles.input, styles.numericInput]}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  placeholder="Peso"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información Médica</Text>

            <Text style={styles.label}>Nivel de Actividad Física</Text>
            <DropDownPicker
              open={openActivity}
              value={activityLevel}
              items={activityItems}
              setOpen={setOpenActivity}
              setValue={setActivityLevel}
              placeholder="Seleccione su nivel de actividad"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholderStyle={styles.dropdownPlaceholder}
            />
            
            <Text style={styles.label}>Alergias</Text>
            <TextInput
              style={styles.textArea}
              value={allergies}
              onChangeText={setAllergies}
              placeholder="Liste sus alergias (ej: penicilina, maní...)"
              placeholderTextColor="#999"
              multiline
            />

            <Text style={styles.label}>Condiciones Preexistentes</Text>
            <TextInput
              style={styles.textArea}
              value={conditions}
              onChangeText={setConditions}
              placeholder="Liste sus condiciones médicas (ej: asma, diabetes...)"
              placeholderTextColor="#999"
              multiline
            />

          </View>

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
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  closeBtn: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
    color: '#444',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numericInput: {
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  datePicker: {
    height: 50,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 10,
  },
  dropdownPlaceholder: {
    color: '#999',
  },
  saveButton: {
    backgroundColor: '#f44',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#f44',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  halfInput: {
    width: '48%',
  }
});
