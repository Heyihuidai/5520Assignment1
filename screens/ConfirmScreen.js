import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import GameScreen from './GameScreen';
import { colors } from '../helper/Colors';

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
      <Card style={styles.card}>
        <Text style={styles.title}>Confirm Your Information</Text>
        <Text style={styles.text}>Name: {userData.name}</Text>
        <Text style={styles.text}>Email: {userData.email}</Text>
        <Text style={styles.text}>Phone: {userData.phone}</Text>
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
    backgroundColor: colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.title,
  },
  text: {
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ConfirmScreen;