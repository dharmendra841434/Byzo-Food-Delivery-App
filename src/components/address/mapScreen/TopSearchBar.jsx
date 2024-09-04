import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import appColors from '../../../utils/appColors';
import CustomText from '../../CustomText';
import Icon2 from 'react-native-vector-icons/Ionicons';

const TopSearchBar = ({handleSearchPress, isElivation}) => {
  return (
    <TouchableOpacity
      onPress={handleSearchPress}
      activeOpacity={0.9}
      style={[
        styles.container,
        {
          borderWidth: isElivation ? 0 : 1,
          borderColor: isElivation ? '' : appColors.borderGray,
          elevation: isElivation ? 5 : 0,
        },
      ]}>
      <Icon2 name="search" size={20} color={appColors.secondry} />
      <CustomText
        font="medium"
        style={{
          color: appColors.blackText,
          marginStart: 5,
          fontSize: 13,
        }}>
        Search for area, street name...
      </CustomText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
    borderRadius: 12,
    paddingBottom: '4%',
    paddingTop: '3%',
    borderWidth: 0.6,
    borderColor: appColors.borderGray,
  },
});
export default TopSearchBar;
