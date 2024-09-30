import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const StartScreen = ({ onRegister, initialInfo }) => {
  const [name, setName] = useState(initialInfo?.name || '');
  const [email, setEmail] = useState(initialInfo?.email || '');
  const [phone, setPhone] = useState(initialInfo?.phone || '');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialInfo) {
      setName(initialInfo.name || '');
      setEmail(initialInfo.email || '');
      setPhone(initialInfo.phone || '');
      // We don't set isChecked here as the user should reconfirm this
    }
  }, [initialInfo]);

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
    if (isFormValid) {
      onRegister({ name, email, phone });
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