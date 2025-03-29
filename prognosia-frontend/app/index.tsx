import { Redirect } from 'expo-router';
import { Text } from 'react-native';
import LoginScreen from './(auth)/login';
import RegisterScreen from './(auth)/register';

export default function App() {
  return (
    <RegisterScreen />
  );
}
