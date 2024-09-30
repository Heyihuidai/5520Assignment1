import React from 'react';
import { View, StyleSheet } from 'react-native';
import StartScreen from '../screens/StartScreen';

export default function App() {
  const handleRegister = (info) => {
    console.log('User registered:', info);
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <StartScreen onRegister={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});