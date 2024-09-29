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


}