import {View, Text} from 'react-native';
import React from 'react';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CustomHeader from '../components/CustomHeader';

const DrawerContent = () => {
  return (
    <View className="flex-1 w-screen h-full bg-white pt-14 rounded-l-xl ">
      <CustomHeader title="Profile" isElivation={false} isBack={false} />
      <ProfileScreen />
    </View>
  );
};

export default DrawerContent;
