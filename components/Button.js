import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, disabled }) => (
  <TouchableOpacity 
    style={[styles.button, disabled && styles.disabled]} 
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  disabled: {
    backgroundColor: 'gray',
  },
  text: {
    color: 'white',
  },
});

export default Button;