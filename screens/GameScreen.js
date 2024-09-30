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
          <View style={styles.card}>
            <Text style={styles.instruction}>
              Guess a number between 1 & 100 that is multiply of {lastDigit}
            </Text>
            <Button title="START" onPress={startGame} style={styles.startButton} />
          </View>
        );
      case 'playing':
        return (
          <View style={styles.card}>
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
              <Button title="Use a Hint" onPress={handleUseHint} style={styles.button} />
              <Button title="Submit guess" onPress={handleSubmitGuess} style={styles.button} />
            </View>
          </View>
        );
      case 'correct':
        return (
          <View style={styles.card}>
            <Text>Congratulations! You guessed the number!</Text>
            <Text>You used {usedAttempts} attempts</Text>
            <Image 
              source={{ uri: `https://picsum.photos/id/${numberToGuess}/100/100` }} 
              style={styles.image} 
            />
            <Button title="New Game" onPress={resetGame} style={styles.button} />
          </View>
        );
      case 'gameOver':
        return (
          <View style={styles.card}>
            <Text>The game is over</Text>
            <Image 
              source={require('../assets/sad-smiley.jpg')} 
              style={styles.image} 
            />
            <Text>{gameOverReason}</Text>
            <Button title="New Game" onPress={resetGame} style={styles.button} />
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Button 
        title="Restart" 
        onPress={onRestart}
        style={styles.restartButton}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    padding: 20,
  },
  restartButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6347',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#A9A9A9',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'purple',
  },
  startButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
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
    borderBottomColor: 'purple',
    width: '80%',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  hintText: {
    marginBottom: 20,
    color: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default GameScreen;