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
}