import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import GameScreen from './GameScreen';

const ConfirmScreen = ({ userData, onGoBack }) => {
  const [showGame, setShowGame] = useState(false);

  const handleConfirm = () => {
    setShowGame(true);
  };

  const handleRestart = () => {
    setShowGame(false);
    onGoBack();
  };

  // Extract the last digit and convert it to a number
  const lastDigit = parseInt(userData.phone.slice(-1));

  if (showGame) {
    return <GameScreen lastDigit={lastDigit} onRestart={handleRestart} />;
  }

  return (
    <View style={styles.confirmContainer}>
      <Card>
        <Text style={styles.title}>Confirm Your Information</Text>
        <Text>Name: {userData.name}</Text>
        <Text>Email: {userData.email}</Text>
        <Text>Phone: {userData.phone}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Edit Information" onPress={onGoBack} type="reset" />
          <Button title="Continue to Game" onPress={handleConfirm} type="register" />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF', // Light blue background
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ConfirmScreen;