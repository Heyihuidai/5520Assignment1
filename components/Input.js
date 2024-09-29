import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const Input = ({ label, value, onChangeText, error }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default Input;