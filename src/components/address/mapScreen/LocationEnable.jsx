import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '../../CustomText';
import appColors from '../../../utils/appColors';
import CustomIcons from '../../CustomIcons';
import {AppIcons} from '../../../utils/constent';

const LocationEnable = ({
  isEnable,
  onEnablePermission,
  handleCurrentLocation,
}) => {
  return (
    <>
      {isEnable ? (
        <TouchableOpacity
          onPress={handleCurrentLocation}
          activeOpacity={0.9}
          style={styles.button}>
          <CustomIcons
            icon={AppIcons?.locationCross}
            color={appColors?.blackText}
          />
          {/* <Icon name="my-location" color={appColors.secondry} size={20} /> */}
          <CustomText font="semibold" style={styles.text}>
            Go to cureent location
          </CustomText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onEnablePermission}
          activeOpacity={0.9}
          style={styles.button}>
          <View style={{position: 'relative'}}>
            <CustomIcons icon={AppIcons?.locationCross} />
            <View className="-rotate-45 " style={styles.cross} />
          </View>
          <CustomText font="medium" style={styles.text}>
            Enable precise location
          </CustomText>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.7,
    borderColor: appColors.secondry,
    marginBottom: 10,
    backgroundColor: appColors.background,
    paddingHorizontal: '2%',
    borderRadius: 8,
    paddingVertical: 3,
    elevation: 5,
  },
  text: {
    color: appColors.secondry,
    fontSize: 11,
    marginStart: '2%',
    marginBottom: 2,
  },
  cross: {
    height: 3,
    width: 20,
    backgroundColor: 'red',
    position: 'absolute',
    marginTop: 9,
    borderWidth: 0.5,
    borderColor: appColors.background,
  },
});

export default LocationEnable;
