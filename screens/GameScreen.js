import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';

const generateNumber = (lastDigit) => {
  if (!lastDigit || isNaN(lastDigit)) return 1;
  const multiples = [];
  for (let i = lastDigit; i <= 100; i += lastDigit) {
    multiples.push(i);
  }
  return multiples[Math.floor(Math.random() * multiples.length)];
};

const GameScreen = ({ lastDigit, onRestart }) => {
  const [numberToGuess, setNumberToGuess] = useState(() => generateNumber(lastDigit));
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60);
  const [guess, setGuess] = useState('');
  const [hint, setHint] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let timer;
    if (isGameStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      endGame('Time is up!');
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isGameStarted]);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleSubmitGuess = () => {
    const guessedNumber = parseInt(guess);
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 100.');
      return;
    }

    if (guessedNumber === numberToGuess) {
      setIsGameOver(true);
      setHint('Congratulations! You guessed the number!');
    } else {
      setAttemptsLeft(attemptsLeft - 1);
      setHint(guessedNumber > numberToGuess ? 'Guess Lower' : 'Guess Higher');
      if (attemptsLeft === 1) endGame('No attempts left!');
    }
    setGuess('');
  };

  const handleUseHint = () => {
    setHint(`The number is a multiple of ${lastDigit}`);
  };

  const endGame = (message) => {
    setIsGameOver(true);
    setHint(message);
  };

  const resetGame = () => {
    setNumberToGuess(generateNumber(lastDigit));
    setAttemptsLeft(4);
    setTimeLeft(60);
    setGuess('');
    setHint(null);
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  return (
    <View style={styles.gameContainer}>
      <Card style={styles.card}>
        {isGameOver ? (
          <View>
            <Text>Game Over!</Text>
            <Text>{hint}</Text>
            {hint.includes('Congratulations') && (
              <Image 
                source={{ uri: `https://picsum.photos/id/${numberToGuess}/100/100` }} 
                style={styles.image} 
              />
            )}
            <Button title="New Game" onPress={resetGame} type="primary" />
          </View>
        ) : !isGameStarted ? (
          <View>
            <Text>You have 60 seconds and 4 attempts to guess a number!</Text>
            <Button title="Start" onPress={handleStartGame} type="primary" />
          </View>
        ) : (
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
        )}
      </Card>
      <Button title="Restart" onPress={onRestart} type="reset" />
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    width: '80%',
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
    marginVertical: 10,
  },
});

export default GameScreen;