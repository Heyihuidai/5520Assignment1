import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Checkbox = ({ label, value, onValueChange }) => (
  <TouchableOpacity onPress={() => onValueChange(!value)}>
    <View style={styles.container}>
      <View style={[styles.checkbox, value && styles.checked]} />
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
  },
  checked: {
    backgroundColor: 'blue',
  },
  label: {
    fontSize: 16,
  },
});

export default Checkbox;