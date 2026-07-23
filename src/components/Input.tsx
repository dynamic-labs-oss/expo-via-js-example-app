import type { FC } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type InputProps = {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
};

export const Input: FC<InputProps> = ({
  autoCapitalize = 'none',
  keyboardType = 'default',
  onChangeText,
  placeholder,
  secureTextEntry = false,
  value,
}) => (
  <View style={styles.container}>
    <TextInput
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
});
