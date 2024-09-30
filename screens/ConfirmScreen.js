import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';

const ConfirmScreen = ({ visible, userInfo, onConfirm, onGoBack }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalBackground}>
        <Card>
          <Text style={styles.title}>Confirm Your Information</Text>
          <Text>Name: {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text>
          <Text>Phone: {userInfo.phone}</Text>
          
          <View style={styles.buttonContainer}>
            <Button title="Edit Information" onPress={onGoBack} type="reset" />
            <Button title="Continue to Game" onPress={onConfirm} type="register" />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ConfirmScreen;