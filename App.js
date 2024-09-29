import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [userInfo, setUserInfo] = useState(null);

  const handleRegister = (info) => {
    setUserInfo(info);
    setCurrentScreen('confirm');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen onRegister={handleRegister} />;
      case 'confirm':
        return <ConfirmScreen 
                 userInfo={userInfo}
                 onConfirm={() => setCurrentScreen('game')}
                 onGoBack={() => setCurrentScreen('start')}
               />;
      case 'game':
        return <GameScreen 
                 onGameOver={() => setCurrentScreen('start')}
               />;
      default:
        return <StartScreen onRegister={handleRegister} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
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