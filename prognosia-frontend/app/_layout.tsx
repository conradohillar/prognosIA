import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, createContext, useContext, useState } from 'react';
import 'react-native-reanimated';

const GlobalStateContext = createContext<{
  globalState: { username: string; token: string | null; email: string | null; userId: string | null };
  setGlobalState: React.Dispatch<
    React.SetStateAction<{
      username: string;
      token: string | null;
      email: string | null;
      userId: string | null;
    }>
  >;
} | null>(null);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)/login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [globalState, setGlobalState] = useState<{
    username: string;
    token: string | null;
    email: string | null;
    userId: string | null;
  }>({
    username: "User",
    token: null,
    email: null,
    userId: null,
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="addFileModal" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="editProfileModal" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="suggestions/tendencies" options={{ headerShown: false }} />
        <Stack.Screen name="suggestions/preventiveControls" options={{ headerShown: false }} />
        <Stack.Screen name="analysing" options={{ headerShown: false }} />
        <Stack.Screen name="results" options={{ headerShown: false }} />
      </Stack>
    </GlobalStateContext.Provider>
  );
}

export const useGlobalState = () => useContext(GlobalStateContext)!;
