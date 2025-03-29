import { Redirect } from 'expo-router';
import { Button, Text } from 'react-native';
import LoginScreen from './(auth)/login';
import RegisterScreen from './(auth)/register'
import { signUp, signIn} from './../services/auth';

export default function App() {
  return (
    // <RegisterScreen />
    
    <Button onPress={() => {signUp("santiagobassi21@gmail.com", "12345678")}} title="Sign Up" />
    

  );
}
