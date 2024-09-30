import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image } from 'react-native';
import Button from '../components/Button';

const generateNumber = (lastDigit) => {
  const multiples = [];
  for (let i = lastDigit; i <= 100; i += lastDigit) {
    multiples.push(i);
  }
  return multiples[Math.floor(Math.random() * multiples.length)];
};

const GameScreen = ({ lastDigit, onRestart }) => {
  const [gameState, setGameState] = useState('initial'); // 'initial', 'playing', 'guessing', 'correct', 'gameOver'
  const [numberToGuess, setNumberToGuess] = useState(() => generateNumber(lastDigit));
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60);
  const [guess, setGuess] = useState('');
  const [hint, setHint] = useState(null);
  const [usedAttempts, setUsedAttempts] = useState(0);
  const [gameOverReason, setGameOverReason] = useState('');

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState !== 'gameOver') {
      endGame('Time is up!');
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
  };

  const handleSubmitGuess = () => {
    const guessedNumber = parseInt(guess);
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 100.');
      return;
    }

    setUsedAttempts(prev => prev + 1);
    setAttemptsLeft(prev => prev - 1);

    if (guessedNumber === numberToGuess) {
      setGameState('correct');
    } else {
      setGameState('guessing');
      setHint(guessedNumber > numberToGuess ? 'Guess Lower' : 'Guess Higher');
      if (attemptsLeft === 1) endGame('No attempts left!');
    }
    setGuess('');
  };

  const handleUseHint = () => {
    setHint(`The number is a multiple of ${lastDigit}`);
  };

  const endGame = (reason) => {
    setGameState('gameOver');
    setGameOverReason(reason);
  };

  const resetGame = () => {
    setNumberToGuess(generateNumber(lastDigit));
    setAttemptsLeft(4);
    setTimeLeft(60);
    setGuess('');
    setHint(null);
    setUsedAttempts(0);
    setGameState('initial');
    setGameOverReason('');
  };

  const renderContent = () => {
    switch (gameState) {
      case 'initial':
        return (
          <View>
            <Text style={styles.instruction}>
              You have 60 seconds and 4 attempts to guess a number that is a multiple of {lastDigit} between 1 and 100.
            </Text>
            <Button title="Start" onPress={startGame} type="primary" />
          </View>
        );
      case 'playing':
      case 'guessing':
        return (
          <View>
            <Text>Time Left: {timeLeft} seconds</Text>
            <Text>Attempts Left: {attemptsLeft}</Text>
            <TextInput 
              placeholder="Enter your guess"
              value={guess}
              onChangeText={setGuess}
              keyboardType="number-pad"
              style={styles.input}
            />
            {hint && <Text>{hint}</Text>}
            <Button title="Submit Guess" onPress={handleSubmitGuess} type="primary" />
            <Button title="Use a Hint" onPress={handleUseHint} type="secondary" />
          </View>
        );
      case 'correct':
        return (
          <View>
            <Text>Congratulations! You guessed the number!</Text>
            <Text>You used {usedAttempts} attempts</Text>
            <Image 
              source={{ uri: `https://picsum.photos/id/${numberToGuess}/100/100` }} 
              style={styles.image} 
            />
            <Button title="New Game" onPress={resetGame} type="primary" />
          </View>
        );
      case 'gameOver':
        return (
          <View>
            <Text>The game is over</Text>
            <Image 
              source={require('../assets/sad-smiley.jpg')} 
              style={styles.image} 
            />
            <Text>{gameOverReason}</Text>
            <Button title="New Game" onPress={resetGame} type="primary" />
          </View>
        );
    }
  };

  return (
    <View style={styles.gameContainer}>
      <View style={styles.header}>
        <Button title="Restart" onPress={onRestart} type="reset" />
      </View>
      <View style={styles.card}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    backgroundColor: '#87CEFA',
  },
  header: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    marginTop: 60,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
  instruction: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default GameScreen;