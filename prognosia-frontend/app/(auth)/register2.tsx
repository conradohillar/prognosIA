import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import EditProfile from '@/components/editProfile';


export default function Register2() {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const handleSubmit = async () => {
    // Handle form submission
    router.push('/home');
  };

  return (
    <EditProfile />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
