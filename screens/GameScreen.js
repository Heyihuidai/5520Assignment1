import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';

const generateNumber = (lastDigit) => {
  const multiples = [];
  for (let i = lastDigit; i <= 100; i += lastDigit) {
    multiples.push(i);
  }
  return multiples[Math.floor(Math.random() * multiples.length)];
};

const GameScreen = ({ lastDigit, onRestart }) => {
  const [gameState, setGameState] = useState('initial');
  const [numberToGuess, setNumberToGuess] = useState(() => generateNumber(lastDigit));
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [usedAttempts, setUsedAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [guess, setGuess] = useState('');
  const [hint, setHint] = useState(null);
  const [gameOverReason, setGameOverReason] = useState('');

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      endGame('Time is up!');
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setAttemptsLeft(4);
    setUsedAttempts(0);
    setTimeLeft(60);
    setHint(null);
  };

  const handleSubmitGuess = () => {
    const guessedNumber = parseInt(guess);
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100 || guessedNumber % lastDigit !== 0) {
      Alert.alert('Invalid Input', `Please enter a multiple of ${lastDigit} between 1 and 100.`);
      return;
    }

    const newAttemptsLeft = attemptsLeft - 1;
    setAttemptsLeft(newAttemptsLeft);
    setUsedAttempts(prev => prev + 1);

    if (guessedNumber === numberToGuess) {
      setGameState('correct');
    } else {
      setHint(guessedNumber > numberToGuess ? 'Guess Lower' : 'Guess Higher');
      if (newAttemptsLeft === 0) {
        endGame('No attempts left!');
      } else {
        setGameState('playing');
      }
    }
    setGuess('');
  };

  const handleUseHint = () => {
    setHint(numberToGuess <= 50 ? '1-50' : '51-100');
  };

  const endGame = (reason) => {
    setGameState('gameOver');
    setGameOverReason(reason);
  };

  const resetGame = () => {
    setGameState('initial');
    setNumberToGuess(generateNumber(lastDigit));
    setAttemptsLeft(4);
    setUsedAttempts(0);
    setTimeLeft(60);
    setGuess('');
    setHint(null);
    setGameOverReason('');
  };

  const renderContent = () => {
    switch (gameState) {
      case 'initial':
        return (
          <Card style={styles.card}>
            <Text style={styles.instruction}>
              Guess a number between 1 & 100 that is multiply of {lastDigit}
            </Text>
            <Button title="START" onPress={startGame} type="register" />
          </Card>
        );
      case 'playing':
        return (
          <Card style={styles.card}>
            <Text style={styles.timerText}>Timer: {timeLeft}s</Text>
            <Text style={styles.attemptsText}>Attempts left: {attemptsLeft}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your guess"
              value={guess}
              onChangeText={setGuess}
              keyboardType="number-pad"
            />
            {hint && <Text style={styles.hintText}>Hint: {hint}</Text>}
            <View style={styles.buttonContainer}>
              <Button title="Use a Hint" onPress={handleUseHint} type="reset" />
              <Button title="Submit guess" onPress={handleSubmitGuess} type="register" />
            </View>
          </Card>
        );
      case 'correct':
        return (
          <Card style={styles.card}>
            <Text>Congratulations! You guessed the number!</Text>
            <Text>You used {usedAttempts} attempts</Text>
            <Image 
              source={{ uri: `https://picsum.photos/id/${numberToGuess}/100/100` }} 
              style={styles.image} 
            />
            <Button title="New Game" onPress={resetGame} type="register" />
          </Card>
        );
      case 'gameOver':
        return (
          <Card style={styles.card}>
            <Text>The game is over</Text>
            <Image 
              source={require('../assets/sad-smiley.jpg')} 
              style={styles.image} 
            />
            <Text>{gameOverReason}</Text>
            <Button title="New Game" onPress={resetGame} type="register" />
          </Card>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Button 
        title="Restart" 
        onPress={onRestart}
        type="reset"
        style={styles.restartButton}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 20,
  },
  restartButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 16,
    marginBottom: 10,
  },
  attemptsText: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '80%',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  hintText: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default GameScreen;