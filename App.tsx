import './src/polyfills';

import { waitForClientInitialized } from '@dynamic-labs-sdk/client';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { client } from './src/client';
import { useDynamicClientState } from './src/hooks/useDynamicClientState';
import { AuthenticatedScreen } from './src/screens/AuthenticatedScreen';
import { LoginScreen } from './src/screens/LoginScreen';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const state = useDynamicClientState();

  useEffect(() => {
    let isMounted = true;

    waitForClientInitialized(client)
      .then(() => {
        if (!isMounted) {
          return;
        }

        if (client.initError) {
          setInitError(client.initError.message);
          return;
        }

        setIsReady(true);
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }

        setInitError(
          error instanceof Error ? error.message : 'Client initialization failed'
        );
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {!isReady ? (
          <View style={styles.centered}>
            <Text>Loading Dynamic client...</Text>
            {initError && (
              <Text style={styles.error}>{initError}</Text>
            )}
          </View>
        ) : state.user ? (
          <AuthenticatedScreen />
        ) : (
          <LoginScreen />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  error: {
    color: 'red',
    marginTop: 12,
    textAlign: 'center',
  },
  scroll: {
    flexGrow: 1,
    padding: 20,
  },
});
