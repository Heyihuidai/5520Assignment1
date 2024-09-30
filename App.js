import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';

export default function App() {
  const [userInfo, setUserInfo] = useState({});
  const [confirmScreenVisible, setConfirmScreenVisible] = useState(false);

  const handleRegister = (info) => {
    setUserInfo(info);
    setConfirmScreenVisible(true); // Show the confirm screen modal
  };

  const handleConfirm = () => {
    setConfirmScreenVisible(false);
    // TODO: Implement game start logic here
  };

  const handleGoBack = () => {
    setConfirmScreenVisible(false);
    // The StartScreen will use the existing userInfo to populate fields
  };

  return (
    <View style={styles.container}>
      <StartScreen onRegister={handleRegister} initialInfo={userInfo} />
      <ConfirmScreen
        visible={confirmScreenVisible}
        userInfo={userInfo}
        onConfirm={handleConfirm}
        onGoBack={handleGoBack}
      />
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