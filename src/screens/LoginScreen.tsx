import type { OTPVerification } from '@dynamic-labs/sdk-api-core';
import { sendEmailOTP, verifyOTP } from '@dynamic-labs-sdk/client';
import type { FC } from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { client } from '../client';
import { Input } from '../components/Input';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
};

export const LoginScreen: FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpVerification, setOtpVerification] =
    useState<OTPVerification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const verification = await sendEmailOTP({ email }, client);
      setOtpVerification(verification);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpVerification) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await verifyOTP(
        { otpVerification, verificationToken: otp },
        client
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dynamic Expo via JS</Text>

      {otpVerification == null ? (
        <>
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
            value={email}
          />
          <Button
            disabled={isLoading || !email}
            onPress={handleSendOtp}
            title="Send OTP"
          />
        </>
      ) : (
        <>
          <Text>Enter the OTP sent to {otpVerification.email}</Text>
          <Input
            keyboardType="number-pad"
            onChangeText={setOtp}
            placeholder="OTP"
            value={otp}
          />
          <Button
            disabled={isLoading || !otp}
            onPress={handleVerifyOtp}
            title="Verify OTP"
          />
        </>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
