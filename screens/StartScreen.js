import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const StartScreen = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (text.length !== 10 || isNaN(text) || ['0', '1'].includes(text[9])) {
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
    if (name && email && phone && isChecked && !Object.values(errors).some(error => error)) {
      onRegister({ name, email, phone });
    } else {
      Alert.alert('Invalid Input', 'Please check your inputs and try again.');
    }
  };

  const isFormValid = name && email && phone && isChecked && !Object.values(errors).some(error => error);

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
    </Card>
  );
};

export default StartScreen;