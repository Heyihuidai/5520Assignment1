import React from 'react';
import { View, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StartScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});