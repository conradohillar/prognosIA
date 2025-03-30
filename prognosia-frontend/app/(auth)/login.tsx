import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { signIn } from '../../services/auth'

import { useGlobalState } from '../_layout';



export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passVisible, setPassVisible] = useState(false);
  const [error, setError] = useState("");
  const {globalState, setGlobalState} = useGlobalState();

  const handleHideOrShowPass = () => {
    setPassVisible(!passVisible);
  }

  const handleLogin = async () => {
    try {
      var user = await signIn(email, password)
      setGlobalState({
        username: "",
        email: user.email,
        token: user.refreshToken,
        userId: user.uid,
      })
      router.replace('/(tabs)/profile');
    }catch (error) {
      setError("error");
    
      return;
    }
    
    
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/prognosia-high-resolution-logo.png')} 
        style={{ width: 300, height: 200, alignSelf: 'center', marginBottom: 20, borderRadius: 20, borderWidth: 1, borderColor: '#ddd' }} 
      />
      <Text style={styles.title}>Login</Text>

      {error !== "" && (
        <Text style={{ color: 'red' }}>Ha ocurrido un error. Por favor, intentá nuevamente.</Text>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passVisible}
          />
          <TouchableOpacity 
            onPress={handleHideOrShowPass}
            style={styles.eyeButton}
          >
            <FontAwesome 
              name={passVisible ? "eye" : "eye-slash"} 
              size={20} 
              color="#aaa" 
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.push('/register')}
      >
        <Text style={styles.registerText}>No tenés cuenta?{" "}
          <Text style={styles.signUpText}>Registrate</Text>
          </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    gap: 15,
    marginBottom: 30,
    width: '100%',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#000',
  },
  signUpText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#FF0000',
    fontWeight: 'bold'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeButton: {
    padding: 15,
  },
});
