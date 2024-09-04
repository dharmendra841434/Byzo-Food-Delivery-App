import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import CustomText from '../CustomText';
import CustomButton from '../CustomButton';

const UserProfileDrawer = ({isOpen, setIsOpen}) => {
  return (
    <Modal
      visible={isOpen}
      style={{backgroundColor: 'green'}}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}>
      <Animatable.View
        animation={isOpen ? 'slideInRight' : 'slideInLeft'}
        style={{backgroundColor: 'red', height: '50%'}}>
        <CustomText>fgfghfgjghjgh</CustomText>
        <CustomButton
          title="CLose Profile"
          onPress={() => setIsOpen(!isOpen)}
        />
      </Animatable.View>
    </Modal>
  );
};

export default UserProfileDrawer;
