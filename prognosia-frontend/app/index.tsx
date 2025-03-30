import { Button } from 'react-native';
import { app }  from '../services/firebaseConfig';

import { addUserDoc } from '../services/fireStore'

export default function App() {
  const apps= app;
  return (
    // <LoginScreen />
    <Button onPress={() => {addUserDoc("holaaa@gmail.com")}} title='aduserrrr'/>
  );
}
