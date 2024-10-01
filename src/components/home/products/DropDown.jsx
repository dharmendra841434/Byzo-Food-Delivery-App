import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import appColors from '../../../utils/appColors';
import CustomText from '../../CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';

const DropDown = () => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <CustomText font="semibold" style={styles.text}>
        Gram
      </CustomText>
      <Icon name="chevron-down-outline" size={16} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '35%',
    marginVertical: '4%',
    paddingHorizontal: '2%',
    paddingBottom: '2%',
    borderRadius: 5,
    backgroundColor: '#d4fcdd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: RFValue(10),
    color: appColors?.secondry,
  },
});

export default DropDown;
