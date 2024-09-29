import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, disabled, type }) => (
  <TouchableOpacity 
    style={[
      styles.button,
      type === 'reset' && styles.resetButton,
      type === 'register' && (disabled ? styles.disabledButton : styles.registerButton),
    ]} 
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: 'red',
  },
  registerButton: {
    backgroundColor: 'blue',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  text: {
    color: 'white',
  },
});

export default Button;