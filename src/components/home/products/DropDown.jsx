import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import appColors from '../../../utils/appColors';
import CustomText from '../../CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomIcons from '../../CustomIcons';
import {AppIcons} from '../../../utils/constent';

const DropDown = () => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <CustomText font="semibold" style={styles.text}>
        Gram
      </CustomText>
      <CustomIcons
        icon={AppIcons?.downfillArrow}
        size={16}
        color={appColors.background}
      />
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
