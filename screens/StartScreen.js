import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ConfirmScreen from './ConfirmScreen';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const StartScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const validateName = (text) => {
    if (text.length <= 1 || /\d/.test(text)) {
      setErrors(prev => ({ ...prev, name: 'Invalid name' }));
    } else {
      setErrors(prev => ({ ...prev, name: null }));
    }
    setName(text);
  };

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: null }));
    }
    setEmail(text);
  };

  const validatePhone = (text) => {
    if (text.length !== 10 || isNaN(text) || ['0', '1'].includes(text[0])) {
      setErrors(prev => ({ ...prev, phone: 'Invalid phone number' }));
    } else {
      setErrors(prev => ({ ...prev, phone: null }));
    }
    setPhone(text);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsChecked(false);
    setErrors({});
  };

  const handleRegister = () => {
    if (isFormValid) {
      setShowConfirm(true);
    } else {
      Alert.alert('Invalid Input', 'Please check your inputs and try again.');
    }
  };

  const handleConfirm = () => {
    console.log('Confirmed. Starting game...');
    // Implement game start logic here
  };

  const handleGoBack = () => {
    setShowConfirm(false);
  };

  const isFormValid = name && email && phone && isChecked && !Object.values(errors).some(error => error);

  if (showConfirm) {
    return (
      <ConfirmScreen
        userData={{ name, email, phone }}
        onConfirm={handleConfirm}
        onGoBack={handleGoBack}
      />
    );
  }

  return (
    <Card>
      <Input
        label="Name"
        value={name}
        onChangeText={validateName}
        error={errors.name}
      />
      <Input
        label="Email"
        value={email}
        onChangeText={validateEmail}
        error={errors.email}
      />
      <Input
        label="Phone Number"
        value={phone}
        onChangeText={validatePhone}
        error={errors.phone}
      />
      <Checkbox
        label="I am not a robot"
        value={isChecked}
        onValueChange={setIsChecked}
      />
      <View style={styles.buttonContainer}>
        <Button 
          title="Reset" 
          onPress={handleReset} 
          type="reset"
        />
        <Button 
          title="Register" 
          onPress={handleRegister} 
          disabled={!isFormValid}
          type="register"
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default StartScreen;