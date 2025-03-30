import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import EditProfile from '@/components/editProfile';

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
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <FontAwesome name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>
      <EditProfile />
    </View>

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
});
