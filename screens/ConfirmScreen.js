import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import GameScreen from './GameScreen';

const ConfirmScreen = ({ userData, onGoBack }) => {
  const [showGame, setShowGame] = useState(false);

  const handleConfirm = () => {
    console.log('Confirmed. Starting game...');
    setShowGame(true);
  };

  if (showGame) {
    return <GameScreen lastDigit={parseInt(userData.phone.slice(-1))} onRestart={() => setShowGame(false)} />;
  }

  return (
    <View style={styles.confirmContainer}>
      <Card style={styles.card}>
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
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
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