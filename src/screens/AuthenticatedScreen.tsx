import type { BaseWalletAccount } from '@dynamic-labs-sdk/client/core';
import {
  getWalletAccounts,
  logout,
  signMessage,
} from '@dynamic-labs-sdk/client';
import { createWaasWalletAccounts } from '@dynamic-labs-sdk/client/waas';
import type { FC } from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { client } from '../client';
import { useDynamicClientState } from '../hooks/useDynamicClientState';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
};

export const AuthenticatedScreen: FC = () => {
  const state = useDynamicClientState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSignature, setLastSignature] = useState<string | null>(null);

  const wallets = getWalletAccounts(client);
  const user = state.user;

  const handleCreateWallet = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await createWaasWalletAccounts({ chains: ['EVM'] }, client);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignMessage = async (walletAccount: BaseWalletAccount) => {
    setIsLoading(true);
    setError(null);

    try {
      const { signature } = await signMessage(
        { message: 'Hello from Expo via JS!', walletAccount },
        client
      );
      setLastSignature(signature);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await logout(client);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authenticated</Text>

      <View style={styles.section}>
        <Text>Email: {user?.email ?? 'N/A'}</Text>
        <Text>User ID: {user?.id ?? 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Button
          disabled={isLoading}
          onPress={handleLogout}
          title="Logout"
        />
      </View>

      <Text style={styles.sectionTitle}>Wallets</Text>

      {wallets.length === 0 ? (
        <View style={styles.section}>
          <Text>No wallets yet.</Text>
          <Button
            disabled={isLoading}
            onPress={handleCreateWallet}
            title="Create EVM Wallet"
          />
        </View>
      ) : (
        wallets.map((wallet) => (
          <View key={wallet.id} style={styles.wallet}>
            <Text>Chain: {wallet.chain}</Text>
            <Text>Address: {wallet.address}</Text>
            <Button
              disabled={isLoading}
              onPress={() => handleSignMessage(wallet)}
              title="Sign message"
            />
          </View>
        ))
      )}

      {lastSignature && (
        <Text style={styles.signature}>
          Signature: {lastSignature.slice(0, 32)}...
        </Text>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 20,
  },
  error: {
    color: 'red',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  signature: {
    color: 'green',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  wallet: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    gap: 8,
    paddingVertical: 12,
  },
});
