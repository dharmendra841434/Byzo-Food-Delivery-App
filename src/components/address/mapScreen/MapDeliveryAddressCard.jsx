import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../../CustomText';
import MarkerIcon from '../MarkerIcon';
import {splitAddressAtFirstComma} from '../../../utils/helperfun';
import appColors from '../../../utils/appColors';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

const MapDeliveryAddressCard = ({
  handleChangeAddress,
  handleConfirmLocation,
  address,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 6,
        paddingVertical: 3,
      }}>
      <CustomText
        font="bold"
        style={{color: appColors.blackText, fontSize: 17}}>
        Delivering your order to{' '}
      </CustomText>
      <View style={styles.addresscard}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '75%',
            }}>
            <MarkerIcon />
            <View
              style={{
                marginStart: '4%',
                width: '80%',
              }}>
              <CustomText
                font="semibold"
                numberOfLines={2} // Limit text to one line
                ellipsizeMode="tail"
                style={styles.cardTitle}>
                {address}
              </CustomText>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleChangeAddress}
              style={{
                borderWidth: 1,
                borderColor: appColors.borderGray,
                paddingHorizontal: 15,
                borderRadius: 5,
                paddingBottom: 3,
              }}>
              <CustomText font="semibold" style={{color: appColors.secondry}}>
                Change
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleConfirmLocation}
          style={[styles.button, {width: '95%', paddingVertical: 2}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomText
              font="semibold"
              style={{
                color: appColors.background,
                fontSize: 16,
              }}>
              Confirm location
            </CustomText>
            <Icon3
              name="arrow-right"
              color={appColors.background}
              size={35}
              style={{marginStart: -8, marginTop: 6}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addresscard: {
    margin: 10,
    backgroundColor: appColors.cardBg,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.bottomSheetBg,
  },
  cardTitle: {
    color: appColors.blackText,
    fontSize: 15,
  },
  cardDesc: {
    color: appColors.blackText,
    fontSize: 12.5,
    opacity: 0.7,
  },
  button: {
    backgroundColor: appColors.secondry,
    width: '90%',
    marginTop: '1%',
    paddingVertical: '2%',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default MapDeliveryAddressCard;
