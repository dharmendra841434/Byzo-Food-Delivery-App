import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import appColors from '../utils/appColors';

const FullScreenLoader = ({loader, setLoader}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loader}
      style={{flex: 1}}
      onRequestClose={() => {
        setLoader(!loader);
      }}>
      <View className="items-center justify-center h-full ">
        <ActivityIndicator size={40} color={appColors?.secondry} />
      </View>
    </Modal>
  );
};

export default FullScreenLoader;
