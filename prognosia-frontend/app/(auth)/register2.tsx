import { StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, StatusBar, SafeAreaView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import EditProfile from '@/components/editProfile';
import { FontAwesome } from '@expo/vector-icons';

import { editProfile } from '@/services/fireStore';

export default function Register2() {


  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Termina de completar tu perfil</Text>
      </View>
      <EditProfile />
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
