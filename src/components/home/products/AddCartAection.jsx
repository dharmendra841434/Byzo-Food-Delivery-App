import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../../CustomText';
import appColors from '../../../utils/appColors';

const AddCartAection = ({price}) => {
  return (
    <View style={styles.actionContainer}>
      <CustomText font="semibold">{price}₹</CustomText>
      <TouchableOpacity activeOpacity={0.7} style={styles.addButton}>
        <CustomText font="bold" style={styles.buttonText}>
          Add
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginTop: '4%',
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: appColors?.third,
    borderRadius: 4,
    paddingHorizontal: '12%',
    paddingBottom: 2,
  },
  buttonText: {
    color: appColors?.third,
  },
});

export default AddCartAection;
