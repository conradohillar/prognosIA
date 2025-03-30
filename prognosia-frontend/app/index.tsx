import { Button } from 'react-native';
import { app }  from '../services/firebaseConfig';

import { addUserDoc } from '../services/fireStore'
import  LoginScreen  from './(auth)/login';

export default function App() {
  const apps= app;
  return (
    <LoginScreen />
  );
}
